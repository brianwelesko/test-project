const express = require('express');
const { query, pool } = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all inventory items for user
router.get('/', async (req, res) => {
  try {
    const result = await query(`
      SELECT * FROM inventory_items
      WHERE user_id = $1
      ORDER BY name ASC
    `, [req.user.id]);

    // Convert to client format (camelCase)
    const formatted = result.rows.map(formatItemForClient);
    res.json(formatted);
  } catch (err) {
    console.error('Get inventory error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new item
router.post('/', async (req, res) => {
  try {
    const item = req.body;

    if (!item || !item.name) {
      return res.status(400).json({ error: 'Item name is required' });
    }

    const result = await query(`
      INSERT INTO inventory_items (
        user_id, name, quantity, unit, category, location,
        threshold, purchase_date, expiration_date, bought_from, is_staple
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `, [
      req.user.id,
      item.name,
      item.quantity || 0,
      item.unit || 'items',
      item.category || 'other',
      item.location || 'pantry',
      item.threshold || 0.2,
      item.purchaseDate || null,
      item.expirationDate || null,
      item.boughtFrom || null,
      item.isStaple ? 1 : 0
    ]);

    res.status(201).json(formatItemForClient(result.rows[0]));
  } catch (err) {
    console.error('Add item error:', err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
});

// Update item
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = req.body;

    // Verify ownership
    const existingResult = await query(
      'SELECT * FROM inventory_items WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );
    if (!existingResult.rows[0]) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const result = await query(`
      UPDATE inventory_items SET
        name = $1, quantity = $2, unit = $3, category = $4, location = $5,
        threshold = $6, purchase_date = $7, expiration_date = $8, bought_from = $9,
        is_staple = $10, updated_at = CURRENT_TIMESTAMP
      WHERE id = $11 AND user_id = $12
      RETURNING *
    `, [
      item.name,
      item.quantity,
      item.unit,
      item.category,
      item.location,
      item.threshold,
      item.purchaseDate || null,
      item.expirationDate || null,
      item.boughtFrom || null,
      item.isStaple ? 1 : 0,
      id,
      req.user.id
    ]);

    res.json(formatItemForClient(result.rows[0]));
  } catch (err) {
    console.error('Update item error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete item
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query(
      'DELETE FROM inventory_items WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Delete item error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Bulk sync (for initial migration from localStorage)
router.post('/sync', async (req, res) => {
  const client = await pool.connect();
  try {
    const { items } = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'Items array required' });
    }

    await client.query('BEGIN');

    for (const item of items) {
      await client.query(`
        INSERT INTO inventory_items (
          user_id, name, quantity, unit, category, location,
          threshold, purchase_date, expiration_date, bought_from, is_staple
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `, [
        req.user.id,
        item.name,
        item.quantity || 0,
        item.unit || 'items',
        item.category || 'other',
        item.location || 'pantry',
        item.threshold || 0.2,
        item.purchaseDate || null,
        item.expirationDate || null,
        item.boughtFrom || null,
        item.isStaple ? 1 : 0
      ]);
    }

    await client.query('COMMIT');

    const allItems = await query('SELECT * FROM inventory_items WHERE user_id = $1', [req.user.id]);
    res.json(allItems.rows.map(formatItemForClient));
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Sync error:', err);
    res.status(500).json({ error: 'Server error' });
  } finally {
    client.release();
  }
});

// Convert DB format (snake_case) to client format (camelCase)
function formatItemForClient(item) {
  return {
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    unit: item.unit,
    category: item.category,
    location: item.location,
    threshold: item.threshold,
    purchaseDate: item.purchase_date,
    expirationDate: item.expiration_date,
    boughtFrom: item.bought_from,
    isStaple: Boolean(item.is_staple),
    createdAt: item.created_at,
    updatedAt: item.updated_at
  };
}

module.exports = router;
