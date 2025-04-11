const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../../data/konten.db');
const db = new sqlite3.Database(dbPath);

// ✅ Mapping kategori ke fallback URL (Picsum)
const gambarMap = {
  "Karir": "https://picsum.photos/seed/karir/400/300",
  "Desain": "https://picsum.photos/seed/desain/400/300",
  "Kuliner": "https://picsum.photos/seed/kuliner/400/300",
  "Pemrograman": "https://picsum.photos/seed/code/400/300",
  "Kesehatan": "https://picsum.photos/seed/health/400/300",
  "Bisnis": "https://picsum.photos/seed/bisnis/400/300",
  "Pendidikan": "https://picsum.photos/seed/belajar/400/300",
  "Teknologi": "https://picsum.photos/seed/teknologi/400/300",
  "Literasi": "https://picsum.photos/seed/literasi/400/300",
  "Psikologi": "https://picsum.photos/seed/psikologi/400/300",
  "Produktivitas": "https://picsum.photos/seed/fokus/400/300",
  "Hobi": "https://picsum.photos/seed/hobi/400/300",
  "Sosial Media": "https://picsum.photos/seed/sosmed/400/300"
};

// 🚀 Ambil data dan update hanya jika gambar belum diisi
db.serialize(() => {
  db.all("SELECT id, judul, kategori, gambar FROM konten", (err, rows) => {
    if (err) return console.error("❌ Gagal ambil data:", err);

    const stmt = db.prepare("UPDATE konten SET gambar = ? WHERE id = ?");

    rows.forEach(row => {
      if (!row.gambar || row.gambar.trim() === "") {
        const seed = `${row.id}-${Math.floor(Math.random() * 10000)}`;
        const keyword = `${row.kategori},${row.judul}`;
        const url = `https://source.unsplash.com/400x300/?${encodeURIComponent(keyword)}&sig=${seed}`;

        // ✅ fallback ke gambarMap jika Unsplash mati
        const fallback = gambarMap[row.kategori] || `https://picsum.photos/seed/default-${seed}/400/300`;

        // Pilih URL utama (bisa fallback nanti kalau perlu)
        stmt.run(url, row.id);
      }
    });

    stmt.finalize(() => {
      console.log("✅ Gambar berhasil di-inject ke semua konten (jika belum ada).");
      db.close();
    });
  });
});
