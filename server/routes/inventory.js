const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all inventory items for user
router.get('/', (req, res) => {
  try {
    const items = db.prepare(`
      SELECT * FROM inventory_items
      WHERE user_id = ?
      ORDER BY name ASC
    `).all(req.user.id);

    // Convert to client format (camelCase)
    const formatted = items.map(formatItemForClient);
    res.json(formatted);
  } catch (err) {
    console.error('Get inventory error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new item
router.post('/', (req, res) => {
  try {
    const item = req.body;

    const result = db.prepare(`
      INSERT INTO inventory_items (
        user_id, name, quantity, unit, category, location,
        threshold, purchase_date, expiration_date, bought_from, is_staple
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
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
    );

    const newItem = db.prepare('SELECT * FROM inventory_items WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(formatItemForClient(newItem));
  } catch (err) {
    console.error('Add item error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update item
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const item = req.body;

    // Verify ownership
    const existing = db.prepare('SELECT * FROM inventory_items WHERE id = ? AND user_id = ?').get(id, req.user.id);
    if (!existing) {
      return res.status(404).json({ error: 'Item not found' });
    }

    db.prepare(`
      UPDATE inventory_items SET
        name = ?, quantity = ?, unit = ?, category = ?, location = ?,
        threshold = ?, purchase_date = ?, expiration_date = ?, bought_from = ?,
        is_staple = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND user_id = ?
    `).run(
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
    );

    const updated = db.prepare('SELECT * FROM inventory_items WHERE id = ?').get(id);
    res.json(formatItemForClient(updated));
  } catch (err) {
    console.error('Update item error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete item
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;

    const result = db.prepare('DELETE FROM inventory_items WHERE id = ? AND user_id = ?').run(id, req.user.id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Delete item error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Bulk sync (for initial migration from localStorage)
router.post('/sync', (req, res) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'Items array required' });
    }

    const insert = db.prepare(`
      INSERT INTO inventory_items (
        user_id, name, quantity, unit, category, location,
        threshold, purchase_date, expiration_date, bought_from, is_staple
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertMany = db.transaction((items) => {
      for (const item of items) {
        insert.run(
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
        );
      }
    });

    insertMany(items);

    const allItems = db.prepare('SELECT * FROM inventory_items WHERE user_id = ?').all(req.user.id);
    res.json(allItems.map(formatItemForClient));
  } catch (err) {
    console.error('Sync error:', err);
    res.status(500).json({ error: 'Server error' });
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
