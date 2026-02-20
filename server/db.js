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
      last_price REAL,
      previous_price REAL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Add price columns if they don't exist (for existing databases)
    DO $$ BEGIN
      ALTER TABLE inventory_items ADD COLUMN IF NOT EXISTS last_price REAL;
      ALTER TABLE inventory_items ADD COLUMN IF NOT EXISTS previous_price REAL;
    EXCEPTION WHEN others THEN NULL;
    END $$;

    CREATE INDEX IF NOT EXISTS idx_inventory_user ON inventory_items(user_id);
    CREATE INDEX IF NOT EXISTS idx_inventory_expiration ON inventory_items(expiration_date);

    CREATE TABLE IF NOT EXISTS receipt_corrections (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      original_text TEXT NOT NULL,
      corrected_name TEXT NOT NULL,
      corrected_quantity REAL,
      corrected_unit TEXT,
      corrected_category TEXT,
      use_count INTEGER DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_corrections_user ON receipt_corrections(user_id);
    CREATE INDEX IF NOT EXISTS idx_corrections_original ON receipt_corrections(original_text);

    CREATE TABLE IF NOT EXISTS digest_log (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      sent_date DATE NOT NULL,
      sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, sent_date)
    );

    CREATE INDEX IF NOT EXISTS idx_digest_log_user_date ON digest_log(user_id, sent_date);
  `);
  console.log('Database initialized');
}

module.exports = { query, initializeDatabase, pool };
