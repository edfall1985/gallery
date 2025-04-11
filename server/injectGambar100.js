
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Path setting dan data
const dbSettingPath = path.resolve(__dirname, '../data/json/settingDb.json');
const dataPath = path.resolve(__dirname, '../data/json/injectGambar100.json');

// Cek dan load path DB
if (!fs.existsSync(dbSettingPath)) {
  console.error('❌ settingDb.json tidak ditemukan.');
  process.exit(1);
}
const dbSetting = JSON.parse(fs.readFileSync(dbSettingPath, 'utf-8'));
const dbPath = path.resolve(__dirname, '..', dbSetting.dbPath || 'data/konten.db');

// Cek dan load data gambar
if (!fs.existsSync(dataPath)) {
  console.error('❌ injectGambar100.json tidak ditemukan.');
  process.exit(1);
}
const gambarData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.all('SELECT id FROM konten ORDER BY id ASC LIMIT ?', [gambarData.length], (err, rows) => {
    if (err) {
      console.error('❌ Gagal mengambil data dari DB:', err.message);
      db.close();
      return;
    }

    const stmt = db.prepare('UPDATE konten SET kategori = ?, gambar = ? WHERE id = ?');

    rows.forEach((row, i) => {
      const item = gambarData[i];
      if (item) {
        stmt.run(item.kategori, item.gambar, row.id);
      }
    });

    stmt.finalize(() => {
      console.log(`✅ Berhasil update ${rows.length} entri kategori & gambar.`);
      db.close();
    });
  });
});
