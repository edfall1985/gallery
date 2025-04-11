const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../data/konten.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Gagal membuka database:', err.message);
  } else {
    console.log('✅ Terkoneksi ke SQLite di', dbPath);
  }
});

module.exports = db;
