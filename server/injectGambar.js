// injectGambar.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Load konfigurasi path DB
const dbSettingPath = path.resolve(__dirname, '../data/json/settingDb.json');
if (!fs.existsSync(dbSettingPath)) {
  console.error('❌ File settingDb.json tidak ditemukan.');
  process.exit(1);
}
const dbSetting = JSON.parse(fs.readFileSync(dbSettingPath, 'utf-8'));
const dbPath = path.resolve(__dirname, '..', dbSetting.dbPath || 'data/konten.db');

// Load gambar dari file JSON
const configPath = path.resolve(__dirname, '../data/json/injectGambar.json');
if (!fs.existsSync(configPath)) {
  console.error('❌ File injectGambar.json tidak ditemukan.');
  process.exit(1);
}
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const gambarUrls = config.gambarUrls || [];

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.all('SELECT id FROM konten ORDER BY id ASC LIMIT ?', [gambarUrls.length], [gambarUrls.length], (err, rows) => {
    if (err) {
      console.error('❌ Gagal mengambil data:', err.message);
      db.close();
      return;
    }

    const stmt = db.prepare('UPDATE konten SET gambar = ? WHERE id = ?');

    rows.forEach((row, i) => {
      if (gambarUrls[i]) {
        stmt.run(gambarUrls[i], row.id);
      }
    });

    stmt.finalize(() => {
      console.log(`✅ Berhasil mengisi ${rows.length} gambar ke database.`);
      db.close();
    });
  });
});
