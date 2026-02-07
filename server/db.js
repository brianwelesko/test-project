const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function query(text, params) {
  const result = await pool.query(text, params);
  return result;
}

async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS inventory_items (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      quantity REAL NOT NULL DEFAULT 0,
      unit TEXT NOT NULL DEFAULT 'items',
      category TEXT DEFAULT 'other',
      location TEXT DEFAULT 'pantry',
      threshold REAL DEFAULT 0.2,
      purchase_date TEXT,
      expiration_date TEXT,
      bought_from TEXT,
      is_staple INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_inventory_user ON inventory_items(user_id);
    CREATE INDEX IF NOT EXISTS idx_inventory_expiration ON inventory_items(expiration_date);
  `);
  console.log('Database initialized');
}

module.exports = { query, initializeDatabase, pool };
