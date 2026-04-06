const express = require('express');
const { query, pool } = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all inventory items for user (excludes soft-deleted by default)
router.get('/', async (req, res) => {
  try {
    const result = await query(`
      SELECT * FROM inventory_items
      WHERE user_id = $1 AND deleted_at IS NULL
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

// Add new item (or restore soft-deleted item with same name)
router.post('/', async (req, res) => {
  try {
    const item = req.body;

    if (!item || !item.name) {
      return res.status(400).json({ error: 'Item name is required' });
    }

    // Check for soft-deleted item with the same name (case-insensitive)
    const deletedResult = await query(`
      SELECT * FROM inventory_items
      WHERE user_id = $1 AND LOWER(name) = LOWER($2) AND deleted_at IS NOT NULL
      ORDER BY deleted_at DESC
      LIMIT 1
    `, [req.user.id, item.name]);

    let resultItem;

    if (deletedResult.rows.length > 0) {
      // Restore the soft-deleted item with updated values
      const deletedItem = deletedResult.rows[0];
      const newPrice = item.last_price || null;
      const previousPrice = newPrice !== null ? deletedItem.last_price : deletedItem.previous_price;

      const restoreResult = await query(`
        UPDATE inventory_items SET
          name = $1,
          quantity = $2,
          unit = $3,
          category = $4,
          location = $5,
          threshold = $6,
          purchase_date = $7,
          expiration_date = $8,
          bought_from = $9,
          is_staple = $10,
          last_price = $11,
          previous_price = $12,
          price_unit = $13,
          brand = $14,
          deleted_at = NULL,
          delete_reason = NULL,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $15
        RETURNING *
      `, [
        item.name,
        item.quantity || 0,
        item.unit || 'items',
        item.category || 'other',
        item.location || 'pantry',
        item.threshold || 0.2,
        item.purchaseDate || null,
        item.expirationDate || null,
        item.boughtFrom || null,
        item.isStaple ? 1 : 0,
        newPrice,
        previousPrice,
        item.price_unit || 'flat',
        item.brand || null,
        deletedItem.id
      ]);

      resultItem = restoreResult.rows[0];

      // Record price history if new price was provided
      if (item.last_price) {
        await query(
          'INSERT INTO price_history (item_id, price, store, price_unit) VALUES ($1, $2, $3, $4)',
          [resultItem.id, item.last_price, item.boughtFrom || null, item.price_unit || 'flat']
        );
      }
    } else {
      // No soft-deleted item found, create new item
      const insertResult = await query(`
        INSERT INTO inventory_items (
          user_id, name, quantity, unit, category, location,
          threshold, purchase_date, expiration_date, bought_from, is_staple,
          last_price, previous_price, price_unit, brand
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
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
        item.isStaple ? 1 : 0,
        item.last_price || null,
        item.previous_price || null,
        item.price_unit || 'flat',
        item.brand || null
      ]);

      resultItem = insertResult.rows[0];

      // Record initial price history if price was provided
      if (item.last_price) {
        await query(
          'INSERT INTO price_history (item_id, price, store, price_unit) VALUES ($1, $2, $3, $4)',
          [resultItem.id, item.last_price, item.boughtFrom || null, item.price_unit || 'flat']
        );
      }
    }

    res.status(201).json(formatItemForClient(resultItem));
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

    // Verify ownership and item is not deleted
    const existingResult = await query(
      'SELECT * FROM inventory_items WHERE id = $1 AND user_id = $2 AND deleted_at IS NULL',
      [id, req.user.id]
    );
    if (!existingResult.rows[0]) {
      return res.status(404).json({ error: 'Item not found or has been deleted' });
    }

    const existing = existingResult.rows[0];

    const result = await query(`
      UPDATE inventory_items SET
        name = $1, quantity = $2, unit = $3, category = $4, location = $5,
        threshold = $6, purchase_date = $7, expiration_date = $8, bought_from = $9,
        is_staple = $10, last_price = $11, previous_price = $12, price_unit = $13, brand = $14,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $15 AND user_id = $16
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
      item.last_price !== undefined ? item.last_price : null,
      item.previous_price !== undefined ? item.previous_price : null,
      item.price_unit || 'flat',
      item.brand !== undefined ? item.brand : null,
      id,
      req.user.id
    ]);

    // Record price history when price changes
    const newPrice = item.last_price !== undefined ? item.last_price : null;
    const oldPrice = existing.last_price;
    if (newPrice !== null && newPrice !== oldPrice) {
      await query(
        'INSERT INTO price_history (item_id, price, store, price_unit) VALUES ($1, $2, $3, $4)',
        [id, newPrice, item.boughtFrom || existing.bought_from || null, item.price_unit || 'flat']
      );
    }

    res.json(formatItemForClient(result.rows[0]));
  } catch (err) {
    console.error('Update item error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete item (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const result = await query(`
      UPDATE inventory_items
      SET deleted_at = CURRENT_TIMESTAMP,
          delete_reason = $3,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $1 AND user_id = $2 AND deleted_at IS NULL
      RETURNING *
    `, [id, req.user.id, reason || null]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Item not found or already deleted' });
    }

    res.json({ success: true, deletedItem: formatItemForClient(result.rows[0]) });
  } catch (err) {
    console.error('Delete item error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Log an activity (deduct or restock) for an item
router.post('/:id/activity', async (req, res) => {
  try {
    const { id } = req.params;
    const { actionType, amount, unit, beforeQuantity, afterQuantity, store, price, priceUnit } = req.body;

    if (!actionType || amount == null || !unit) {
      return res.status(400).json({ error: 'actionType, amount, and unit are required' });
    }

    // Verify ownership
    const ownerCheck = await query(
      'SELECT id FROM inventory_items WHERE id = $1 AND user_id = $2 AND deleted_at IS NULL',
      [id, req.user.id]
    );
    if (!ownerCheck.rows[0]) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const result = await query(`
      INSERT INTO item_activity_log
        (item_id, user_id, action_type, amount, unit, before_quantity, after_quantity, store, price, price_unit)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `, [id, req.user.id, actionType, amount, unit, beforeQuantity ?? null, afterQuantity ?? null,
        store || null, price ?? null, priceUnit || null]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Log activity error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get activity log for an item
router.get('/:id/activity', async (req, res) => {
  try {
    const { id } = req.params;

    // Verify ownership
    const ownerCheck = await query(
      'SELECT id FROM inventory_items WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );
    if (!ownerCheck.rows[0]) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const result = await query(
      'SELECT * FROM item_activity_log WHERE item_id = $1 ORDER BY logged_at DESC LIMIT 100',
      [id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Get activity log error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get price history for an item
router.get('/:id/price-history', async (req, res) => {
  try {
    const { id } = req.params;

    // Verify ownership
    const ownerCheck = await query(
      'SELECT id FROM inventory_items WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );
    if (!ownerCheck.rows[0]) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const result = await query(
      'SELECT id, price, store, price_unit, recorded_at FROM price_history WHERE item_id = $1 ORDER BY recorded_at ASC',
      [id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Get price history error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a price history record (e.g., to edit store name)
router.put('/price-history/:historyId', async (req, res) => {
  try {
    const { historyId } = req.params;
    const { store } = req.body;

    // Verify ownership through the item
    const ownerCheck = await query(`
      SELECT ph.id FROM price_history ph
      JOIN inventory_items i ON ph.item_id = i.id
      WHERE ph.id = $1 AND i.user_id = $2
    `, [historyId, req.user.id]);

    if (!ownerCheck.rows[0]) {
      return res.status(404).json({ error: 'Price history record not found' });
    }

    const result = await query(
      'UPDATE price_history SET store = $1 WHERE id = $2 RETURNING *',
      [store, historyId]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update price history error:', err);
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

    const allItems = await query('SELECT * FROM inventory_items WHERE user_id = $1 AND deleted_at IS NULL', [req.user.id]);
    res.json(allItems.rows.map(formatItemForClient));
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Sync error:', err);
    res.status(500).json({ error: 'Server error' });
  } finally {
    client.release();
  }
});

// Get all instances of an item by name (includes active and deleted)
router.get('/history/:name', async (req, res) => {
  try {
    const { name } = req.params;

    const result = await query(`
      SELECT i.*,
             (SELECT COUNT(*) FROM price_history WHERE item_id = i.id) as price_record_count
      FROM inventory_items i
      WHERE i.user_id = $1 AND LOWER(i.name) = LOWER($2)
      ORDER BY i.created_at DESC
    `, [req.user.id, name]);

    const formatted = result.rows.map(item => ({
      ...formatItemForClient(item),
      priceRecordCount: parseInt(item.price_record_count)
    }));

    res.json(formatted);
  } catch (err) {
    console.error('Get item history error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get combined price history for an item name (across all instances)
router.get('/history/:name/prices', async (req, res) => {
  try {
    const { name } = req.params;

    const result = await query(`
      SELECT ph.id, ph.price, ph.store, ph.price_unit, ph.recorded_at, i.id as item_id, i.created_at as item_created
      FROM price_history ph
      JOIN inventory_items i ON ph.item_id = i.id
      WHERE i.user_id = $1 AND LOWER(i.name) = LOWER($2)
      ORDER BY ph.recorded_at ASC
    `, [req.user.id, name]);

    res.json(result.rows);
  } catch (err) {
    console.error('Get combined price history error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Restore a soft-deleted item
router.post('/:id/restore', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query(`
      UPDATE inventory_items
      SET deleted_at = NULL,
          delete_reason = NULL,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $1 AND user_id = $2 AND deleted_at IS NOT NULL
      RETURNING *
    `, [id, req.user.id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Deleted item not found' });
    }

    res.json(formatItemForClient(result.rows[0]));
  } catch (err) {
    console.error('Restore item error:', err);
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
    last_price: item.last_price,
    previous_price: item.previous_price,
    price_unit: item.price_unit || 'flat',
    brand: item.brand,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    deletedAt: item.deleted_at || null,
    deleteReason: item.delete_reason || null
  };
}

// Quantity history routes
router.get('/:id/quantity-history', async (req, res) => {
  try {
    const result = await query(
      `SELECT qh.* FROM quantity_history qh
       JOIN inventory_items i ON i.id = qh.item_id
       WHERE qh.item_id = $1 AND i.user_id = $2
       ORDER BY qh.recorded_at DESC`,
      [req.params.id, req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Get quantity history error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:id/quantity-history', async (req, res) => {
  try {
    const { action, amount, unit, quantity_before, quantity_after, note } = req.body;
    const owns = await query(
      'SELECT id FROM inventory_items WHERE id = $1 AND user_id = $2 AND deleted_at IS NULL',
      [req.params.id, req.user.id]
    );
    if (!owns.rows[0]) return res.status(404).json({ error: 'Not found' });
    const result = await query(
      `INSERT INTO quantity_history (item_id, action, amount, unit, quantity_before, quantity_after, note)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [req.params.id, action, amount, unit, quantity_before ?? null, quantity_after, note ?? null]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Add quantity history error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
