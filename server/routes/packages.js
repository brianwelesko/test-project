const express = require('express');
const { query, pool } = require('../db');
const { authenticateToken } = require('../middleware/auth');
const { convertQuantity, normalizeUnit } = require('../utils/unitConversion');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all packages for user
router.get('/', async (req, res) => {
  try {
    const result = await query(`
      SELECT p.*,
             COUNT(pi.id) as item_count,
             (SELECT executed_at FROM package_execution_log
              WHERE package_id = p.id
              ORDER BY executed_at DESC LIMIT 1) as last_executed
      FROM deduction_packages p
      LEFT JOIN package_items pi ON p.id = pi.package_id
      WHERE p.user_id = $1
      GROUP BY p.id
      ORDER BY p.name ASC
    `, [req.user.id]);

    res.json(result.rows.map(formatPackageForClient));
  } catch (err) {
    console.error('Get packages error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single package with items
router.get('/:id', async (req, res) => {
  try {
    const packageResult = await query(
      'SELECT * FROM deduction_packages WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );

    if (!packageResult.rows[0]) {
      return res.status(404).json({ error: 'Package not found' });
    }

    const items = await query(
      'SELECT * FROM package_items WHERE package_id = $1 ORDER BY item_name',
      [req.params.id]
    );

    res.json({
      ...formatPackageForClient(packageResult.rows[0]),
      items: items.rows.map(formatPackageItemForClient)
    });
  } catch (err) {
    console.error('Get package error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get package by name
router.get('/name/:name', async (req, res) => {
  try {
    const packageResult = await query(
      'SELECT * FROM deduction_packages WHERE LOWER(name) = LOWER($1) AND user_id = $2',
      [req.params.name, req.user.id]
    );

    if (!packageResult.rows[0]) {
      return res.status(404).json({ error: 'Package not found' });
    }

    const items = await query(
      'SELECT * FROM package_items WHERE package_id = $1 ORDER BY item_name',
      [packageResult.rows[0].id]
    );

    res.json({
      ...formatPackageForClient(packageResult.rows[0]),
      items: items.rows.map(formatPackageItemForClient)
    });
  } catch (err) {
    console.error('Get package by name error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new package
router.post('/', async (req, res) => {
  const client = await pool.connect();
  try {
    const { name, description, items } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Package name is required' });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'At least one item is required' });
    }

    await client.query('BEGIN');

    // Create package
    const packageResult = await client.query(`
      INSERT INTO deduction_packages (user_id, name, description)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [req.user.id, name.trim(), description || null]);

    const pkg = packageResult.rows[0];

    // Insert items
    for (const item of items) {
      if (!item.itemName || item.quantity === undefined) continue;

      await client.query(`
        INSERT INTO package_items (package_id, item_name, quantity, unit)
        VALUES ($1, $2, $3, $4)
      `, [pkg.id, item.itemName.trim(), item.quantity, normalizeUnit(item.unit) || 'items']);
    }

    await client.query('COMMIT');

    // Fetch complete package with items
    const itemsResult = await query(
      'SELECT * FROM package_items WHERE package_id = $1',
      [pkg.id]
    );

    res.status(201).json({
      ...formatPackageForClient(pkg),
      items: itemsResult.rows.map(formatPackageItemForClient)
    });
  } catch (err) {
    await client.query('ROLLBACK');
    if (err.code === '23505') { // unique violation
      return res.status(400).json({ error: 'A package with this name already exists' });
    }
    console.error('Create package error:', err);
    res.status(500).json({ error: 'Server error' });
  } finally {
    client.release();
  }
});

// Update package
router.put('/:id', async (req, res) => {
  const client = await pool.connect();
  try {
    const { name, description, items } = req.body;

    // Verify ownership
    const existing = await client.query(
      'SELECT * FROM deduction_packages WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );

    if (!existing.rows[0]) {
      return res.status(404).json({ error: 'Package not found' });
    }

    await client.query('BEGIN');

    // Update package metadata
    await client.query(`
      UPDATE deduction_packages
      SET name = $1, description = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
    `, [name || existing.rows[0].name, description, req.params.id]);

    // Replace items if provided
    if (items && Array.isArray(items)) {
      await client.query('DELETE FROM package_items WHERE package_id = $1', [req.params.id]);

      for (const item of items) {
        if (!item.itemName || item.quantity === undefined) continue;

        await client.query(`
          INSERT INTO package_items (package_id, item_name, quantity, unit)
          VALUES ($1, $2, $3, $4)
        `, [req.params.id, item.itemName.trim(), item.quantity, normalizeUnit(item.unit) || 'items']);
      }
    }

    await client.query('COMMIT');

    // Fetch updated package
    const packageResult = await query(
      'SELECT * FROM deduction_packages WHERE id = $1',
      [req.params.id]
    );
    const itemsResult = await query(
      'SELECT * FROM package_items WHERE package_id = $1',
      [req.params.id]
    );

    res.json({
      ...formatPackageForClient(packageResult.rows[0]),
      items: itemsResult.rows.map(formatPackageItemForClient)
    });
  } catch (err) {
    await client.query('ROLLBACK');
    if (err.code === '23505') {
      return res.status(400).json({ error: 'A package with this name already exists' });
    }
    console.error('Update package error:', err);
    res.status(500).json({ error: 'Server error' });
  } finally {
    client.release();
  }
});

// Delete package
router.delete('/:id', async (req, res) => {
  try {
    const result = await query(
      'DELETE FROM deduction_packages WHERE id = $1 AND user_id = $2 RETURNING *',
      [req.params.id, req.user.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Package not found' });
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Delete package error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Execute package (deduct items)
router.post('/:id/execute', async (req, res) => {
  const client = await pool.connect();
  try {
    const { multiplier = 1, skipMissing = false, skipInsufficient = false } = req.body;

    // Get package
    const packageResult = await client.query(
      'SELECT * FROM deduction_packages WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );

    if (!packageResult.rows[0]) {
      return res.status(404).json({ error: 'Package not found' });
    }

    const pkg = packageResult.rows[0];

    // Get package items
    const itemsResult = await client.query(
      'SELECT * FROM package_items WHERE package_id = $1',
      [req.params.id]
    );

    if (itemsResult.rows.length === 0) {
      return res.status(400).json({ error: 'Package has no items' });
    }

    // Get user's inventory
    const inventoryResult = await client.query(
      'SELECT * FROM inventory_items WHERE user_id = $1 AND deleted_at IS NULL',
      [req.user.id]
    );

    const inventory = inventoryResult.rows;
    const results = [];
    const errors = [];

    // Match and validate each package item
    for (const pkgItem of itemsResult.rows) {
      const match = findInventoryMatch(pkgItem.item_name, inventory);

      if (!match) {
        if (skipMissing) {
          results.push({
            itemName: pkgItem.item_name,
            status: 'skipped',
            reason: 'not_found'
          });
          continue;
        }
        errors.push({
          itemName: pkgItem.item_name,
          error: 'Item not found in inventory'
        });
        continue;
      }

      // Convert units
      const deductAmount = convertQuantity(
        pkgItem.quantity * multiplier,
        pkgItem.unit,
        match.unit,
        pkgItem.item_name
      );

      if (deductAmount === null) {
        errors.push({
          itemName: pkgItem.item_name,
          error: `Cannot convert ${pkgItem.unit} to ${match.unit}`
        });
        continue;
      }

      // Check sufficient quantity
      if (match.quantity < deductAmount) {
        if (skipInsufficient) {
          results.push({
            itemName: pkgItem.item_name,
            status: 'skipped',
            reason: 'insufficient',
            available: match.quantity,
            needed: deductAmount,
            unit: match.unit
          });
          continue;
        }
        errors.push({
          itemName: pkgItem.item_name,
          error: `Insufficient quantity: have ${match.quantity} ${match.unit}, need ${deductAmount} ${match.unit}`
        });
        continue;
      }

      results.push({
        itemName: pkgItem.item_name,
        inventoryItemId: match.id,
        inventoryItemName: match.name,
        deductAmount,
        unit: match.unit,
        beforeQuantity: match.quantity,
        afterQuantity: Math.round((match.quantity - deductAmount) * 100) / 100,
        status: 'pending'
      });
    }

    // If there are errors and not skipping, fail early
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
        message: 'Some items could not be deducted'
      });
    }

    // Execute deductions in transaction
    await client.query('BEGIN');

    for (const result of results) {
      if (result.status === 'pending') {
        await client.query(`
          UPDATE inventory_items
          SET quantity = quantity - $1, updated_at = CURRENT_TIMESTAMP
          WHERE id = $2
        `, [result.deductAmount, result.inventoryItemId]);
        result.status = 'completed';
      }
    }

    // Log execution
    await client.query(`
      INSERT INTO package_execution_log
      (user_id, package_id, package_name, status, details)
      VALUES ($1, $2, $3, $4, $5)
    `, [
      req.user.id,
      pkg.id,
      pkg.name,
      'completed',
      JSON.stringify({ multiplier, results })
    ]);

    await client.query('COMMIT');

    res.json({
      success: true,
      packageName: pkg.name,
      multiplier,
      results
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Execute package error:', err);
    res.status(500).json({ error: 'Server error' });
  } finally {
    client.release();
  }
});

// Execute ad-hoc deduction (without saving as package)
router.post('/adhoc/execute', async (req, res) => {
  const client = await pool.connect();
  try {
    const { items, skipMissing = false, skipInsufficient = false } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items array is required' });
    }

    // Get user's inventory
    const inventoryResult = await client.query(
      'SELECT * FROM inventory_items WHERE user_id = $1 AND deleted_at IS NULL',
      [req.user.id]
    );

    const inventory = inventoryResult.rows;
    const results = [];
    const errors = [];

    // Match and validate each item
    for (const item of items) {
      const match = findInventoryMatch(item.itemName, inventory);

      if (!match) {
        if (skipMissing) {
          results.push({
            itemName: item.itemName,
            status: 'skipped',
            reason: 'not_found'
          });
          continue;
        }
        errors.push({
          itemName: item.itemName,
          error: 'Item not found in inventory'
        });
        continue;
      }

      const deductAmount = convertQuantity(
        item.quantity,
        normalizeUnit(item.unit),
        match.unit,
        item.itemName
      );

      if (deductAmount === null) {
        errors.push({
          itemName: item.itemName,
          error: `Cannot convert ${item.unit} to ${match.unit}`
        });
        continue;
      }

      if (match.quantity < deductAmount) {
        if (skipInsufficient) {
          results.push({
            itemName: item.itemName,
            status: 'skipped',
            reason: 'insufficient',
            available: match.quantity,
            needed: deductAmount,
            unit: match.unit
          });
          continue;
        }
        errors.push({
          itemName: item.itemName,
          error: `Insufficient quantity: have ${match.quantity} ${match.unit}, need ${deductAmount} ${match.unit}`
        });
        continue;
      }

      results.push({
        itemName: item.itemName,
        inventoryItemId: match.id,
        inventoryItemName: match.name,
        deductAmount,
        unit: match.unit,
        beforeQuantity: match.quantity,
        afterQuantity: Math.round((match.quantity - deductAmount) * 100) / 100,
        status: 'pending'
      });
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
        message: 'Some items could not be deducted'
      });
    }

    // Execute deductions
    await client.query('BEGIN');

    for (const result of results) {
      if (result.status === 'pending') {
        await client.query(`
          UPDATE inventory_items
          SET quantity = quantity - $1, updated_at = CURRENT_TIMESTAMP
          WHERE id = $2
        `, [result.deductAmount, result.inventoryItemId]);
        result.status = 'completed';
      }
    }

    // Log as ad-hoc execution
    await client.query(`
      INSERT INTO package_execution_log
      (user_id, package_id, package_name, status, details)
      VALUES ($1, NULL, $2, $3, $4)
    `, [
      req.user.id,
      'ad-hoc',
      'completed',
      JSON.stringify({ items, results })
    ]);

    await client.query('COMMIT');

    res.json({
      success: true,
      results
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Ad-hoc execute error:', err);
    res.status(500).json({ error: 'Server error' });
  } finally {
    client.release();
  }
});

// Get execution history
router.get('/history/all', async (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;

    const result = await query(`
      SELECT * FROM package_execution_log
      WHERE user_id = $1
      ORDER BY executed_at DESC
      LIMIT $2 OFFSET $3
    `, [req.user.id, limit, offset]);

    res.json(result.rows.map(formatExecutionLogForClient));
  } catch (err) {
    console.error('Get history error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Helper: Find inventory item by name (case-insensitive, fuzzy)
function findInventoryMatch(searchName, inventory) {
  const search = searchName.toLowerCase().trim();

  // Try exact match first
  let match = inventory.find(item =>
    item.name.toLowerCase() === search
  );
  if (match) return match;

  // Try contains match
  match = inventory.find(item =>
    item.name.toLowerCase().includes(search) ||
    search.includes(item.name.toLowerCase())
  );
  if (match) return match;

  // Try word match
  const searchWords = search.split(/\s+/);
  for (const item of inventory) {
    const itemName = item.name.toLowerCase();
    for (const word of searchWords) {
      if (word.length >= 3 && itemName.includes(word)) {
        return item;
      }
    }
  }

  return null;
}

// Format helpers
function formatPackageForClient(pkg) {
  return {
    id: pkg.id,
    name: pkg.name,
    description: pkg.description,
    itemCount: parseInt(pkg.item_count) || 0,
    lastExecuted: pkg.last_executed,
    createdAt: pkg.created_at,
    updatedAt: pkg.updated_at
  };
}

function formatPackageItemForClient(item) {
  return {
    id: item.id,
    itemName: item.item_name,
    quantity: item.quantity,
    unit: item.unit
  };
}

function formatExecutionLogForClient(log) {
  return {
    id: log.id,
    packageId: log.package_id,
    packageName: log.package_name,
    executedAt: log.executed_at,
    status: log.status,
    details: log.details
  };
}

module.exports = router;
