import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../../data/dataGallery.json');

// GET
export function getGallery(req, res) {
  try {
    const json = fs.readFileSync(filePath, 'utf8');
    res.setHeader('Cache-Control', 'no-store');
    res.json(JSON.parse(json));
  } catch (err) {
    console.error("❌ Gagal baca data:", err);
    res.status(500).json({ message: "Gagal membaca data." });
  }
}

// POST
export function addGalleryItem(req, res) {
  const newItem = req.body;
  let data = [];

  try {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    console.warn("⚠️ File kosong / error baca lama.");
  }

  data.push(newItem);

  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    res.json({ message: "✅ Data ditambahkan!" });
  } catch (err) {
    console.error("❌ Gagal simpan:", err);
    res.status(500).json({ message: "Gagal menyimpan data." });
  }
}

// DELETE
export function deleteGalleryItem(req, res) {
  const index = parseInt(req.params.index);

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (index < 0 || index >= data.length) {
      return res.status(400).json({ message: "Index tidak valid." });
    }

    data.splice(index, 1);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    res.json({ message: "✅ Data dihapus." });
  } catch (err) {
    console.error("❌ Gagal hapus:", err);
    res.status(500).json({ message: "Gagal menghapus data." });
  }
}
