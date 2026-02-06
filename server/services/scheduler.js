const cron = require('node-cron');
const db = require('../db');
const { sendDigestEmail } = require('./email');

// How many days before expiration to alert
const EXPIRY_WARNING_DAYS = 5;

function startScheduler() {
  // Run daily at 8:00 AM
  cron.schedule('0 8 * * *', async () => {
    console.log('Running daily digest check...');
    await sendDailyDigests();
  });

  console.log('Scheduler started - daily digest at 8:00 AM');

  // Also run immediately on startup in development
  if (process.env.NODE_ENV === 'development' && process.env.RUN_DIGEST_ON_START === 'true') {
    console.log('Development mode: running digest check now...');
    sendDailyDigests();
  }
}

async function sendDailyDigests() {
  try {
    // Get all users
    const users = db.prepare('SELECT id, email FROM users').all();

    for (const user of users) {
      const alerts = getAlertsForUser(user.id);

      // Only send if there are alerts
      if (alerts.expiringItems.length > 0 || alerts.lowStockItems.length > 0) {
        console.log(`Sending digest to ${user.email}: ${alerts.expiringItems.length} expiring, ${alerts.lowStockItems.length} low stock`);
        await sendDigestEmail(user.email, alerts);
      } else {
        console.log(`No alerts for ${user.email}`);
      }
    }
  } catch (err) {
    console.error('Digest error:', err);
  }
}

function getAlertsForUser(userId) {
  const items = db.prepare('SELECT * FROM inventory_items WHERE user_id = ?').all(userId);

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
  const alerts = getAlertsForUser(userId);
  if (alerts.expiringItems.length > 0 || alerts.lowStockItems.length > 0) {
    return await sendDigestEmail(userEmail, alerts);
  }
  return { success: true, message: 'No alerts to send' };
}

module.exports = { startScheduler, sendDailyDigests, triggerDigestForUser, getAlertsForUser };
