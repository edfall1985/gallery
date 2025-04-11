const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Pastikan folder 'data' ada
const folderPath = path.resolve(__dirname, '..', 'data');
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
  console.log('📁 Folder "data" berhasil dibuat.');
}

const dbPath = path.resolve(folderPath, 'konten.db');
console.log('📂 Path DB:', dbPath);

// Inisialisasi database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Gagal membuka database:', err.message);
    return;
  }
  console.log('✅ Terkoneksi ke SQLite di', dbPath);

  // Drop dan buat ulang tabel konten
  db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS konten`);

    db.run(`
      CREATE TABLE IF NOT EXISTS konten (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        judul TEXT NOT NULL,
        deskripsi TEXT,
        kategori TEXT NOT NULL,
        gambar TEXT,
        tags TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error("❌ Gagal buat ulang tabel:", err.message);
      } else {
        console.log("✅ Tabel 'konten' berhasil dibuat ulang.");
      }
      db.close();
    });
  });
});
