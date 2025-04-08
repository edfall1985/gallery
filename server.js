// Import module yang dibutuhkan
import express from 'express';  // Framework backend untuk handle request
import cors from 'cors';        // Agar bisa diakses dari domain/front-end lain
import fs from 'fs';            // Untuk baca dan tulis file data
import path from 'path';
import { fileURLToPath } from 'url';

// Setup path __dirname karena pakai ES Module (import)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Buat instance aplikasi Express
const app = express();

// Gunakan PORT dari environment variable atau default ke 3100
const PORT = process.env.PORT || 3100;

// Middleware untuk izinkan request dari luar dan parsing JSON body
app.use(cors());
app.use(express.json()); // Untuk handle req.body dari POST

// Endpoint GET untuk ambil semua data dari dataGallery.json
app.get('/dataGallery', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'data', 'dataGallery.json');
    const json = fs.readFileSync(filePath, 'utf8');
    res.setHeader('Cache-Control', 'no-store');
    res.json(JSON.parse(json));
  } catch (err) {
    console.error("❌ Gagal membaca data:", err);
    res.status(500).json({ message: "Gagal membaca data." });
  }
});

// Endpoint POST untuk nambah data baru ke dataGallery.json
app.post('/api/add', (req, res) => {
  console.log('📥 API /api/add dipanggil');

  const newItem = req.body;
  console.log('✅ Data diterima:', newItem);

  const filePath = path.join(__dirname, 'data', 'dataGallery.json');

  // Baca data lama
  let data = [];
  try {
    const rawData = fs.readFileSync(filePath, 'utf8');
    data = JSON.parse(rawData);
  } catch (err) {
    console.warn("⚠️ Tidak bisa baca data lama atau file kosong. Akan buat baru.");
  }

  // Tambahkan item baru
  data.push(newItem);

  // Simpan kembali ke file JSON
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('✅ Data berhasil ditulis ke file.');
    res.json({ message: "Data berhasil dikirim!" });
  } catch (err) {
    console.error("❌ Gagal menyimpan data:", err);
    res.status(500).json({ message: "Gagal menyimpan data." });
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
