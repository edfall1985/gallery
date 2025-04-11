
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Path konfigurasi
const dbSettingPath = path.resolve(__dirname, '../data/json/settingDb.json');
const dataPath = path.resolve(__dirname, '../data/json/injectData.json');

// Ambil path database dari settingDb.json
if (!fs.existsSync(dbSettingPath)) {
  console.error('❌ File settingDb.json tidak ditemukan.');
  process.exit(1);
}
const dbSetting = JSON.parse(fs.readFileSync(dbSettingPath, 'utf-8'));
const dbPath = path.resolve(__dirname, '..', dbSetting.dbPath || 'data/konten.db');

// Periksa apakah Data.db ada, atau sudah dalam folder yang benar?
if (!fs.existsSync(dataPath)) {
  console.error('❌ File injectData.json tidak ditemukan.');
  process.exit(1);
}

const contentData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const db = new sqlite3.Database(dbPath);

db.serialize(() => {

// Create
// Read
// Update
// Delete

// Ambil data judul, deskripsi, dan gambar
  db.all('SELECT id FROM konten ORDER BY id ASC LIMIT ?', [contentData.length], (err, rows) => {
    if (err) {
      console.error('❌ Gagal mengambil data:', err.message);
      db.close();
      return;
    }

    const stmt = db.prepare('UPDATE konten SET judul = ?, deskripsi = ?, gambar = ? WHERE id = ?');

    rows.forEach((row, i) => {
      const item = contentData[i];
      if (item) {
        stmt.run(item.judul, item.deskripsi, item.gambar, row.id);
      }
    });

    stmt.finalize(() => {
      console.log(`✅ Berhasil mengupdate ${rows.length} entri dengan judul, deskripsi, dan gambar.`);
      db.close();
    });
  });
});
