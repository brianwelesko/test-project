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

  const html = buildEmailHtml(expiringItems, lowStockItems);

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'My Pantry <onboarding@resend.dev>',
      to: userEmail,
      subject: `Pantry: ${expiringItems.length + lowStockItems.length} items need attention`,
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
  // Site palette
  const c = {
    bg:          '#FCF9F7',
    card:        '#FFFFFF',
    border:      '#E8DDD0',
    terra:       '#E35336',
    terraLight:  'rgba(227, 83, 54, 0.08)',
    amber:       '#8B7040',
    amberLight:  '#FFF8E7',
    sage:        '#5C7A5C',
    textPrimary: '#2C2318',
    textMuted:   '#8B7B6B',
    mono:        "'Courier New', Courier, monospace",
    sans:        "Georgia, 'Times New Roman', serif",
  };

  // Categorise expiring items
  const expired   = expiringItems.filter(i => i.daysUntilExpiry  <  0);
  const useToday  = expiringItems.filter(i => i.daysUntilExpiry === 0);
  const useSoon   = expiringItems.filter(i => i.daysUntilExpiry  >  0);

  const itemRow = (item, accentColor, bgColor) => {
    const daysText = item.daysUntilExpiry < 0
      ? `Expired ${Math.abs(item.daysUntilExpiry)} day${Math.abs(item.daysUntilExpiry) === 1 ? '' : 's'} ago`
      : item.daysUntilExpiry === 0
        ? 'Use today'
        : `${item.daysUntilExpiry} day${item.daysUntilExpiry === 1 ? '' : 's'} left`;

    return `
      <tr>
        <td style="padding: 0 0 2px 0;">
          <div style="
            background: ${bgColor};
            border-left: 3px solid ${accentColor};
            padding: 10px 14px;
            display: block;
          ">
            <span style="
              font-family: ${c.sans};
              font-size: 15px;
              color: ${c.textPrimary};
              font-weight: 600;
            ">${escapeHtml(item.name)}</span>
            <span style="
              font-family: ${c.mono};
              font-size: 11px;
              color: ${accentColor};
              margin-left: 10px;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            ">${daysText}</span>
            <br>
            <span style="
              font-family: ${c.mono};
              font-size: 11px;
              color: ${c.textMuted};
              text-transform: uppercase;
              letter-spacing: 0.04em;
            ">${item.quantity} ${item.unit} &mdash; ${escapeHtml(item.location || '')}</span>
          </div>
        </td>
      </tr>`;
  };

  const lowStockRow = (item) => `
    <tr>
      <td style="padding: 0 0 2px 0;">
        <div style="
          background: ${c.bg};
          border-left: 3px solid ${c.textMuted};
          padding: 10px 14px;
        ">
          <span style="
            font-family: ${c.sans};
            font-size: 15px;
            color: ${c.textPrimary};
            font-weight: 600;
          ">${escapeHtml(item.name)}</span>
          <span style="
            font-family: ${c.mono};
            font-size: 11px;
            color: ${c.textMuted};
            margin-left: 10px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          ">Low stock</span>
          <br>
          <span style="
            font-family: ${c.mono};
            font-size: 11px;
            color: ${c.textMuted};
            text-transform: uppercase;
            letter-spacing: 0.04em;
          ">${item.quantity} ${item.unit} remaining</span>
        </div>
      </td>
    </tr>`;

  const section = (label, rows, accentColor) => rows.length === 0 ? '' : `
    <tr>
      <td style="padding: 24px 0 6px 0;">
        <span style="
          font-family: ${c.mono};
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: ${accentColor};
        ">${label}</span>
      </td>
    </tr>
    ${rows}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Lora:wght@600&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background:${c.bg};">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${c.bg};padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:560px;" cellpadding="0" cellspacing="0">

          <!-- Header -->
          <tr>
            <td style="padding-bottom: 8px; border-bottom: 1px solid ${c.border};">
              <span style="
                font-family: 'Lora', Georgia, serif;
                font-size: 22px;
                font-weight: 600;
                color: ${c.textPrimary};
                letter-spacing: 0.01em;
              ">My Pantry</span>
              <span style="
                font-family: ${c.mono};
                font-size: 11px;
                color: ${c.textMuted};
                margin-left: 12px;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                vertical-align: middle;
              ">Daily digest</span>
            </td>
          </tr>

          <!-- Alert sections -->
          ${section('Expired', expired.map(i => itemRow(i, c.terra, c.terraLight)).join(''), c.terra)}
          ${section('Use Today', useToday.map(i => itemRow(i, c.terra, c.terraLight)).join(''), c.terra)}
          ${section('Use Soon', useSoon.map(i => itemRow(i, c.amber, c.amberLight)).join(''), c.amber)}
          ${section('Low Stock', lowStockItems.map(i => lowStockRow(i)).join(''), c.textMuted)}

          <!-- Footer -->
          <tr>
            <td style="padding-top: 32px; border-top: 1px solid ${c.border}; margin-top: 24px;">
              <span style="
                font-family: ${c.mono};
                font-size: 10px;
                color: ${c.textMuted};
                text-transform: uppercase;
                letter-spacing: 0.06em;
              ">Pantry Tracker &mdash; automated digest</span>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

module.exports = { sendDigestEmail };
