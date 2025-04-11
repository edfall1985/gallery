const express = require('express');
const path = require('path');
const cors = require('cors');
const contentRoutes = require('./routes/contentRoutes');
const dbPath = path.resolve(__dirname, '../data/konten.db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Ini agar bisa akses /js/, /style/, /gallery/, dll langsung dari public/
app.use(express.static(path.join(__dirname, '../public')));

// Optional: akses juga via /public/
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API routes
app.use('/api/content', contentRoutes);

app.listen(PORT, () => {
  console.log(`🔥 Server ready at http://localhost:${PORT}`);
});