
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Path konfigurasi
const dbSettingPath = path.resolve(__dirname, '../data/json/settingDb.json');
const configKategoriJudul = path.resolve(__dirname, '../data/json/kategoriJudulInject.json');

// Ambil path database dari settingDb.json
if (!fs.existsSync(dbSettingPath)) {
  console.error('❌ File settingDb.json tidak ditemukan.');
  process.exit(1);
}
const dbSetting = JSON.parse(fs.readFileSync(dbSettingPath, 'utf-8'));
const dbPath = path.resolve(__dirname, '..', dbSetting.dbPath || 'data/konten.db');

// Ambil data judul dan kategori dari file JSON baru
if (!fs.existsSync(configKategoriJudul)) {
  console.error('❌ File kategoriJudulInject_2.json tidak ditemukan.');
  process.exit(1);
}
const kategoriData = JSON.parse(fs.readFileSync(configKategoriJudul, 'utf-8'));

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.all('SELECT id, judul, kategori FROM konten ORDER BY id ASC', (err, rows) => {
    if (err) {
      console.error('❌ Gagal mengambil data:', err.message);
      db.close();
      return;
    }

    // Buat array berisi semua judul dan kategori dari file JSON
    const generated = [];
    for (const kategori in kategoriData) {
      kategoriData[kategori].forEach(judul => {
        generated.push({ judul: judul, kategori: kategori });
      });
    }

    if (rows.length === 0) {
      const stmt = db.prepare('INSERT INTO konten (judul, kategori) VALUES (?, ?)');
      generated.forEach(item => {
        stmt.run(item.judul, item.kategori);
      });
      stmt.finalize(() => {
        console.log(`🆕 Tabel kosong, ${generated.length} entri baru berhasil dibuat.`);
        db.close();
      });
    } else {
      const stmt = db.prepare('UPDATE konten SET judul = ?, kategori = ? WHERE id = ?');
      let count = 0;
      rows.forEach((row, index) => {
        const newData = generated[index];
        if (newData) {
          stmt.run(newData.judul, newData.kategori, row.id);
          count++;
        }
      });
      stmt.finalize(() => {
        console.log(`🔁 Berhasil mengupdate ${count} entri judul dan kategori dari kategoriJudulInject_2.json.`);
        db.close();
      });
    }
  });
});
