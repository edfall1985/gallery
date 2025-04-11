const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "..", "..", "data", "konten.db");
const db = new sqlite3.Database(dbPath);

// Buat tabel kalau belum ada
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS konten (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      judul TEXT NOT NULL,
      deskripsi TEXT,
      kategori TEXT NOT NULL,
      gambar TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
