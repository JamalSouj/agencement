const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

// Create database file in server directory
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new Database(dbPath);

console.log('Connected to SQLite database.');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE
  );

  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    client TEXT,
    image_url TEXT,
    category_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(category_id) REFERENCES categories(id)
  );

  CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
  );
`);

// Seed initial data if tables are empty
const categoriesCount = db.prepare('SELECT COUNT(*) as count FROM categories').get();
if (categoriesCount.count === 0) {
    const insertCategory = db.prepare('INSERT INTO categories (name, slug) VALUES (?, ?)');
    insertCategory.run('Bancaire', 'bancaire');
    insertCategory.run('Commercial', 'commercial');
    insertCategory.run('Hôtellerie', 'hotellerie');
    insertCategory.run('Industriel', 'industriel');
    insertCategory.run('Événementiel', 'evenementiel');
    console.log('Categories seeded.');
}

const adminCount = db.prepare('SELECT COUNT(*) as count FROM admin_users').get();
if (adminCount.count === 0) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('admin123', salt);
    db.prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)').run('admin', hash);
    console.log('Admin user seeded. (admin / admin123)');
}

// Ensure the db connection is closed when closing node
process.on('SIGINT', () => {
    db.close();
    process.exit();
});

module.exports = db;
