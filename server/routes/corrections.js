const express = require('express');
const { query } = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

// Get all corrections for user (for autocomplete/suggestion)
router.get('/', async (req, res) => {
  try {
    const result = await query(`
      SELECT * FROM receipt_corrections
      WHERE user_id = $1
      ORDER BY use_count DESC, updated_at DESC
    `, [req.user.id]);

    res.json(result.rows.map(formatCorrectionForClient));
  } catch (err) {
    console.error('Get corrections error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add or update a correction
router.post('/', async (req, res) => {
  try {
    const { originalText, correctedName, correctedQuantity, correctedUnit, correctedCategory } = req.body;

    if (!originalText || !correctedName) {
      return res.status(400).json({ error: 'Original text and corrected name required' });
    }

    const normalizedOriginal = originalText.toLowerCase().trim();

    // Check if correction already exists
    const existing = await query(`
      SELECT * FROM receipt_corrections
      WHERE user_id = $1 AND LOWER(original_text) = $2
    `, [req.user.id, normalizedOriginal]);

    let result;
    if (existing.rows.length > 0) {
      // Update existing correction
      result = await query(`
        UPDATE receipt_corrections SET
          corrected_name = $1,
          corrected_quantity = $2,
          corrected_unit = $3,
          corrected_category = $4,
          use_count = use_count + 1,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $5
        RETURNING *
      `, [
        correctedName,
        correctedQuantity || null,
        correctedUnit || null,
        correctedCategory || null,
        existing.rows[0].id
      ]);
    } else {
      // Insert new correction
      result = await query(`
        INSERT INTO receipt_corrections (
          user_id, original_text, corrected_name, corrected_quantity, corrected_unit, corrected_category
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `, [
        req.user.id,
        normalizedOriginal,
        correctedName,
        correctedQuantity || null,
        correctedUnit || null,
        correctedCategory || null
      ]);
    }

    res.status(201).json(formatCorrectionForClient(result.rows[0]));
  } catch (err) {
    console.error('Add correction error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Bulk save corrections
router.post('/bulk', async (req, res) => {
  try {
    const { corrections } = req.body;

    if (!Array.isArray(corrections)) {
      return res.status(400).json({ error: 'Corrections array required' });
    }

    const saved = [];
    for (const correction of corrections) {
      if (!correction.originalText || !correction.correctedName) continue;

      const normalizedOriginal = correction.originalText.toLowerCase().trim();

      const existing = await query(`
        SELECT * FROM receipt_corrections
        WHERE user_id = $1 AND LOWER(original_text) = $2
      `, [req.user.id, normalizedOriginal]);

      let result;
      if (existing.rows.length > 0) {
        result = await query(`
          UPDATE receipt_corrections SET
            corrected_name = $1,
            corrected_quantity = $2,
            corrected_unit = $3,
            corrected_category = $4,
            use_count = use_count + 1,
            updated_at = CURRENT_TIMESTAMP
          WHERE id = $5
          RETURNING *
        `, [
          correction.correctedName,
          correction.correctedQuantity || null,
          correction.correctedUnit || null,
          correction.correctedCategory || null,
          existing.rows[0].id
        ]);
      } else {
        result = await query(`
          INSERT INTO receipt_corrections (
            user_id, original_text, corrected_name, corrected_quantity, corrected_unit, corrected_category
          ) VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *
        `, [
          req.user.id,
          normalizedOriginal,
          correction.correctedName,
          correction.correctedQuantity || null,
          correction.correctedUnit || null,
          correction.correctedCategory || null
        ]);
      }
      saved.push(formatCorrectionForClient(result.rows[0]));
    }

    res.status(201).json(saved);
  } catch (err) {
    console.error('Bulk corrections error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

function formatCorrectionForClient(row) {
  return {
    id: row.id,
    originalText: row.original_text,
    correctedName: row.corrected_name,
    correctedQuantity: row.corrected_quantity,
    correctedUnit: row.corrected_unit,
    correctedCategory: row.corrected_category,
    useCount: row.use_count,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

module.exports = router;
