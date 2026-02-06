const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'pantry.db'));

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS inventory_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
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
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_inventory_user ON inventory_items(user_id);
  CREATE INDEX IF NOT EXISTS idx_inventory_expiration ON inventory_items(expiration_date);
`);

module.exports = db;
