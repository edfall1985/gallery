const express = require('express');
const getDb = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
  const db = getDb();
  if (!db) return res.status(500).send('Database tidak ditemukan');

  db.all('SELECT * FROM konten', [], (err, rows) => {
    if (err) {
      return res.status(500).send('Query gagal');
    }
    res.json(rows);
  });
});

module.exports = router;
