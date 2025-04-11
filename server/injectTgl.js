const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Path konfigurasi
const dbSettingPath = path.resolve(__dirname, '../data/json/settingDb.json');
const configPath = path.resolve(__dirname, '../data/json/injectTgl.json');

// Ambil path dari settingDb.json
if (!fs.existsSync(dbSettingPath)) {
  console.error('❌ File settingDb.json tidak ditemukan.');
  process.exit(1);
}
const dbSetting = JSON.parse(fs.readFileSync(dbSettingPath, 'utf-8'));
const dbPath = path.resolve(__dirname, '..', dbSetting.dbPath || 'data/konten.db');

// Ambil konfigurasi injectTgl.json
if (!fs.existsSync(configPath)) {
  console.error('❌ File konfigurasi injectTgl.json tidak ditemukan.');
  process.exit(1);
}
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const overwrite = config.overwrite ?? true;

// Fungsi parsing tanggal (support DD/MM/YYYY)
function parseTanggal(input) {
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(input)) {
    const [dd, mm, yyyy] = input.split('/');
    return new Date(`${yyyy}-${mm}-${dd}`);
  }
  return new Date(input);
}

const tglAwal = parseTanggal(config.tglAwal);
const tglAkhir = parseTanggal(config.tglAkhir);

if (isNaN(tglAwal) || isNaN(tglAkhir)) {
  console.error('❌ Format tanggal tidak valid dalam config JSON.');
  process.exit(1);
}

// Fungsi untuk generate tanggal acak (format DD/MM/YYYY)
function randomTanggal(start, end) {
  const t = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  const day = String(t.getDate()).padStart(2, '0');
  const month = String(t.getMonth() + 1).padStart(2, '0');
  const year = t.getFullYear();
  return `${day}/${month}/${year}`;
}

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.all('SELECT id, created_at FROM konten ORDER BY id ASC', (err, rows) => {
    if (err) {
      console.error('❌ Gagal ambil data:', err.message);
      db.close();
      return;
    }

    // Kalau kosong, insert 100 entri dengan tanggal acak
    if (rows.length === 0) {
      const stmt = db.prepare('INSERT INTO konten (judul, kategori, created_at) VALUES (?, ?, ?)');
      for (let i = 1; i <= 100; i++) {
        const tanggal = randomTanggal(tglAwal, tglAkhir);
        stmt.run(`Judul Otomatis ${i}`, `Kategori ${Math.ceil(i / 10)}`, tanggal);
      }
      stmt.finalize(() => {
        console.log('🆕 Tabel kosong, 100 entri baru berhasil dibuat dengan tanggal acak.');
        db.close();
      });
    } else {
      // Kalau sudah ada, update entri
      const stmt = db.prepare('UPDATE konten SET created_at = ? WHERE id = ?');
      let count = 0;

      rows.forEach(row => {
        if (overwrite || !row.created_at) {
          const tanggal = randomTanggal(tglAwal, tglAkhir);
          stmt.run(tanggal, row.id);
          count++;
        }
      });

      stmt.finalize(() => {
        console.log(`✅ Berhasil update ${count} entri created_at dengan tanggal acak.`);
        db.close();
      });
    }
  });
});
