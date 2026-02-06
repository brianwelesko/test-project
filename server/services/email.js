const { Resend } = require('resend');

// Initialize Resend - requires RESEND_API_KEY env variable
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function sendDigestEmail(userEmail, alerts) {
  if (!resend) {
    console.log('Email service not configured (missing RESEND_API_KEY)');
    console.log('Would send to:', userEmail);
    console.log('Alerts:', JSON.stringify(alerts, null, 2));
    return { success: false, reason: 'not_configured' };
  }

  const { expiringItems, lowStockItems } = alerts;

  // Build email HTML
  const html = buildEmailHtml(expiringItems, lowStockItems);

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Pantry Tracker <onboarding@resend.dev>',
      to: userEmail,
      subject: `Pantry Alert: ${expiringItems.length + lowStockItems.length} items need attention`,
      html: html
    });

    if (error) {
      console.error('Email send error:', error);
      return { success: false, error };
    }

    console.log('Email sent:', data.id);
    return { success: true, id: data.id };
  } catch (err) {
    console.error('Email error:', err);
    return { success: false, error: err.message };
  }
}

function buildEmailHtml(expiringItems, lowStockItems) {
  let html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">
        Pantry Inventory Alert
      </h1>
  `;

  if (expiringItems.length > 0) {
    html += `
      <h2 style="color: #e74c3c;">
        ⏰ Expiring Soon (${expiringItems.length} items)
      </h2>
      <ul style="list-style: none; padding: 0;">
    `;

    for (const item of expiringItems) {
      const daysText = item.daysUntilExpiry <= 0
        ? '<strong style="color: #e74c3c;">EXPIRED</strong>'
        : `<strong>${item.daysUntilExpiry}</strong> day${item.daysUntilExpiry === 1 ? '' : 's'} left`;

      html += `
        <li style="padding: 10px; margin: 5px 0; background: #fff5f5; border-left: 4px solid #e74c3c; border-radius: 4px;">
          <strong>${escapeHtml(item.name)}</strong> - ${daysText}
          <br><span style="color: #666; font-size: 14px;">${item.quantity} ${item.unit} in ${item.location}</span>
        </li>
      `;
    }

    html += '</ul>';
  }

  if (lowStockItems.length > 0) {
    html += `
      <h2 style="color: #f39c12;">
        📦 Low Stock (${lowStockItems.length} items)
      </h2>
      <ul style="list-style: none; padding: 0;">
    `;

    for (const item of lowStockItems) {
      html += `
        <li style="padding: 10px; margin: 5px 0; background: #fffbf0; border-left: 4px solid #f39c12; border-radius: 4px;">
          <strong>${escapeHtml(item.name)}</strong> - ${item.quantity} ${item.unit} remaining
          <br><span style="color: #666; font-size: 14px;">Below ${Math.round(item.threshold * 100)}% threshold</span>
        </li>
      `;
    }

    html += '</ul>';
  }

  html += `
      <p style="color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">
        This is an automated alert from your Pantry Inventory Tracker.
      </p>
    </div>
  `;

  return html;
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

module.exports = { sendDigestEmail };
