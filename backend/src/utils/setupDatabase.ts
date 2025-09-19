import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create database connection
const dbPath = path.join(__dirname, '../../database/contacts.sqlite');
const db = new sqlite3.Database(dbPath);

// Promisify database methods
export const dbRun = (sql: string, params?: any[]): Promise<{ lastID: number; changes: number }> => {
  return new Promise((resolve, reject) => {
    db.run(sql, params || [], function(this: sqlite3.RunResult, err: Error | null) {
      if (err) {
        reject(err);
      } else {
        // Ensure lastID and changes are valid numbers
        const lastID = typeof this.lastID === 'number' ? this.lastID : 0;
        const changes = typeof this.changes === 'number' ? this.changes : 0;
        
        // For INSERT statements, lastID should be a positive number
        if (sql.trim().toUpperCase().startsWith('INSERT') && lastID <= 0) {
          reject(new Error('Failed to get valid lastID from INSERT operation'));
        } else {
          resolve({ lastID, changes });
        }
      }
    });
  });
};
export const dbGet = promisify(db.get.bind(db));
export const dbAll = promisify(db.all.bind(db));

export async function setupDatabase() {
  try {
    // Create contacts table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL CHECK(length(name) >= 2 AND length(name) <= 100),
        email TEXT NOT NULL UNIQUE CHECK(email LIKE '%@%.%'),
        phone TEXT NOT NULL CHECK(length(phone) = 10 AND phone GLOB '[0-9]*'),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create index for better performance
    await dbRun(`
      CREATE INDEX IF NOT EXISTS idx_contacts_name ON contacts(name);
    `);

    await dbRun(`
      CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
    `);

    // Create trigger to update updated_at timestamp
    await dbRun(`
      CREATE TRIGGER IF NOT EXISTS update_contacts_updated_at 
      AFTER UPDATE ON contacts
      BEGIN
        UPDATE contacts SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
      END;
    `);

    console.log('✅ Database tables created successfully');
  } catch (error) {
    console.error('❌ Database setup error:', error);
    throw error;
  }
}

export { db };