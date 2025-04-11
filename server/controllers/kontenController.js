const db = require("../scripts/db"); // ✅ Fix path ke database

// 🔥 Tambah Konten
function tambahKonten(req, res) {
  const { judul, deskripsi, kategori } = req.body;
  const gambar = req.file ? req.file.filename : null;
  const created_at = new Date().toISOString().split("T")[0];

  const sql = `
    INSERT INTO konten (judul, deskripsi, kategori, gambar, created_at)
    VALUES (?, ?, ?, ?, ?)
  `;
  const params = [judul, deskripsi, kategori, gambar, created_at];

  db.run(sql, params, function (err) {
    if (err) {
      console.error("❌ Gagal tambah konten:", err.message);
      return res.status(500).json({ error: "Gagal tambah konten" });
    }

    console.log("✅ Konten ditambahkan, ID:", this.lastID);
    res.status(201).json({ message: "Konten berhasil ditambahkan", id: this.lastID });
  });
}

// 📥 Ambil Semua Konten
function getAllKonten(req, res) {
  const sql = "SELECT * FROM konten ORDER BY id DESC";

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("❌ Gagal ambil konten:", err.message);
      return res.status(500).json({ error: "Gagal ambil data konten" });
    }

    res.json(rows);
  });
}

// ❌ Hapus Konten
function deleteContent(req, res) {
  const { id } = req.params;
  const sql = "DELETE FROM konten WHERE id = ?";

  db.run(sql, [id], function (err) {
    if (err) {
      console.error("❌ Gagal hapus konten:", err.message);
      return res.status(500).json({ error: "Gagal hapus konten" });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Konten tidak ditemukan" });
    }

    console.log("🗑️ Konten ID", id, "berhasil dihapus");
    res.json({ message: "Konten berhasil dihapus" });
  });
}

// 📝 Update Konten (optional, belum dipakai)
function updateKonten(req, res) {
  res.json({ message: "Konten berhasil diupdate (dummy)", changes: this.changes });
}

module.exports = {
  tambahKonten,
  getAllKonten,
  deleteContent,
  updateKonten,
};
