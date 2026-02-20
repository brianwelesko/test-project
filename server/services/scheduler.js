const cron = require('node-cron');
const { query } = require('../db');
const { sendDigestEmail } = require('./email');

// How many days before expiration to alert
const EXPIRY_WARNING_DAYS = 5;

// Hour when daily digest should run (24-hour format)
const DIGEST_HOUR = 8;

function startScheduler() {
  // Run daily at 8:00 AM
  cron.schedule('0 8 * * *', async () => {
    console.log('Running daily digest check...');
    await sendDailyDigests();
  });

  console.log('Scheduler started - daily digest at 8:00 AM');
}

// Check if we missed the daily digest (for when server was sleeping)
async function checkAndSendMissedDigests() {
  const now = new Date();
  const currentHour = now.getHours();

  // Only check if we're past the scheduled digest time
  if (currentHour < DIGEST_HOUR) {
    console.log('Before digest time, skipping missed digest check');
    return;
  }

  const today = now.toISOString().split('T')[0]; // YYYY-MM-DD format

  try {
    // Get all users who haven't received a digest today
    const usersResult = await query(`
      SELECT u.id, u.email
      FROM users u
      WHERE NOT EXISTS (
        SELECT 1 FROM digest_log dl
        WHERE dl.user_id = u.id
        AND dl.sent_date = $1
      )
    `, [today]);

    const usersNeedingDigest = usersResult.rows;

    if (usersNeedingDigest.length === 0) {
      console.log('All users have received digest today, no catch-up needed');
      return;
    }

    console.log(`Found ${usersNeedingDigest.length} user(s) who missed daily digest, sending now...`);

    for (const user of usersNeedingDigest) {
      await sendDigestToUser(user.id, user.email);
    }
  } catch (err) {
    console.error('Error checking for missed digests:', err);
  }
}

async function sendDailyDigests() {
  try {
    // Get all users
    const usersResult = await query('SELECT id, email FROM users');
    const users = usersResult.rows;

    for (const user of users) {
      await sendDigestToUser(user.id, user.email);
    }
  } catch (err) {
    console.error('Digest error:', err);
  }
}

// Send digest to a single user and log it
async function sendDigestToUser(userId, userEmail) {
  const today = new Date().toISOString().split('T')[0];

  try {
    // Check if already sent today
    const alreadySent = await query(
      'SELECT 1 FROM digest_log WHERE user_id = $1 AND sent_date = $2',
      [userId, today]
    );

    if (alreadySent.rows.length > 0) {
      console.log(`Digest already sent to ${userEmail} today, skipping`);
      return;
    }

    const alerts = await getAlertsForUser(userId);

    // Only send if there are alerts
    if (alerts.expiringItems.length > 0 || alerts.lowStockItems.length > 0) {
      console.log(`Sending digest to ${userEmail}: ${alerts.expiringItems.length} expiring, ${alerts.lowStockItems.length} low stock`);
      await sendDigestEmail(userEmail, alerts);
    } else {
      console.log(`No alerts for ${userEmail}`);
    }

    // Log that we processed this user today (even if no alerts)
    await query(
      'INSERT INTO digest_log (user_id, sent_date) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [userId, today]
    );
  } catch (err) {
    console.error(`Error sending digest to ${userEmail}:`, err);
  }
}

async function getAlertsForUser(userId) {
  const itemsResult = await query('SELECT * FROM inventory_items WHERE user_id = $1', [userId]);
  const items = itemsResult.rows;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expiringItems = [];
  const lowStockItems = [];

  for (const item of items) {
    // Check expiration
    if (item.expiration_date) {
      const expDate = new Date(item.expiration_date);
      expDate.setHours(0, 0, 0, 0);
      const daysUntilExpiry = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));

      if (daysUntilExpiry <= EXPIRY_WARNING_DAYS) {
        expiringItems.push({
          name: item.name,
          quantity: item.quantity,
          unit: item.unit,
          location: item.location,
          expirationDate: item.expiration_date,
          daysUntilExpiry
        });
      }
    }

    // Check low stock (for staples or items with threshold)
    if (item.is_staple && item.threshold > 0) {
      // Assuming threshold is a percentage and we consider "low" when quantity is below some baseline
      // For simplicity, we'll flag items where quantity is below 1 unit for staples
      // Or you could track original quantity - for now, flag if quantity < 1 for staples
      if (item.quantity < 1) {
        lowStockItems.push({
          name: item.name,
          quantity: item.quantity,
          unit: item.unit,
          threshold: item.threshold,
          isStaple: true
        });
      }
    }
  }

  // Sort by urgency
  expiringItems.sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);
  lowStockItems.sort((a, b) => a.quantity - b.quantity);

  return { expiringItems, lowStockItems };
}

// Export for manual triggering (e.g., API endpoint)
async function triggerDigestForUser(userId, userEmail) {
  const alerts = await getAlertsForUser(userId);
  if (alerts.expiringItems.length > 0 || alerts.lowStockItems.length > 0) {
    return await sendDigestEmail(userEmail, alerts);
  }
  return { success: true, message: 'No alerts to send' };
}

module.exports = { startScheduler, sendDailyDigests, triggerDigestForUser, getAlertsForUser, checkAndSendMissedDigests };
