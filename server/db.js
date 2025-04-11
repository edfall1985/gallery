// server/db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, '..', 'data', 'konten.db');

function getDb() {
  if (!fs.existsSync(dbPath)) {
    console.error('❌ File database tidak ditemukan:', dbPath);
    return null;
  }

  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('❌ Gagal membuka database:', err.message);
    } else {
      console.log('✅ Terkoneksi ke SQLite di', dbPath);
    }
  });

  return db;
}

module.exports = getDb;
