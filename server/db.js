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

    -- Add price/brand columns if they don't exist (for existing databases)
    DO $$ BEGIN
      ALTER TABLE inventory_items ADD COLUMN IF NOT EXISTS last_price REAL;
      ALTER TABLE inventory_items ADD COLUMN IF NOT EXISTS previous_price REAL;
      ALTER TABLE inventory_items ADD COLUMN IF NOT EXISTS brand TEXT;
    EXCEPTION WHEN others THEN NULL;
    END $$;

    -- Add soft delete columns (for existing databases)
    DO $$ BEGIN
      ALTER TABLE inventory_items ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP DEFAULT NULL;
      ALTER TABLE inventory_items ADD COLUMN IF NOT EXISTS delete_reason TEXT DEFAULT NULL;
    EXCEPTION WHEN others THEN NULL;
    END $$;

    CREATE INDEX IF NOT EXISTS idx_inventory_deleted ON inventory_items(deleted_at);

    CREATE TABLE IF NOT EXISTS price_history (
      id SERIAL PRIMARY KEY,
      item_id INTEGER REFERENCES inventory_items(id) ON DELETE CASCADE,
      price REAL NOT NULL,
      store TEXT,
      recorded_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_price_history_item ON price_history(item_id);

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

    -- Deduction packages (e.g., "chai" recipe)
    CREATE TABLE IF NOT EXISTS deduction_packages (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, name)
    );

    CREATE INDEX IF NOT EXISTS idx_packages_user ON deduction_packages(user_id);

    -- Items within each package
    CREATE TABLE IF NOT EXISTS package_items (
      id SERIAL PRIMARY KEY,
      package_id INTEGER NOT NULL REFERENCES deduction_packages(id) ON DELETE CASCADE,
      item_name TEXT NOT NULL,
      quantity REAL NOT NULL,
      unit TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_package_items_package ON package_items(package_id);

    -- Package execution history
    CREATE TABLE IF NOT EXISTS package_execution_log (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      package_id INTEGER REFERENCES deduction_packages(id) ON DELETE SET NULL,
      package_name TEXT NOT NULL,
      executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status TEXT NOT NULL DEFAULT 'completed',
      details JSONB
    );

    CREATE INDEX IF NOT EXISTS idx_execution_log_user ON package_execution_log(user_id);
    CREATE INDEX IF NOT EXISTS idx_execution_log_package ON package_execution_log(package_id);
  `);
  console.log('Database initialized');
}

module.exports = { query, initializeDatabase, pool };
