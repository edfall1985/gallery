const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const contentRoutes = require('./routes/contentRoutes');

// 🔐 Pastikan file database ada
const dbPath = path.resolve(__dirname, '../data/konten.db');
if (!fs.existsSync(dbPath)) {
  console.error('❌ Database konten.db tidak ditemukan di:', dbPath);
  process.exit(1); // Hentikan server jika tidak ada DB
}

const app = express();
const PORT = 3000;

// 🔓 Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Akses file statis seperti /js, /style, /gallery
app.use(express.static(path.join(__dirname, '../public')));
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ✅ API route utama
app.use('/api/content', contentRoutes);

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`🔥 Server ready at http://localhost:${PORT}`);
});
