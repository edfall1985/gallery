const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../../data/konten.db');
const db = new sqlite3.Database(dbPath);

const data = [
  {
    judul: "Tips Sukses Wawancara Kerja",
    deskripsi: "Strategi jitu menghadapi pertanyaan HRD tanpa grogi.",
    kategori: "Karir",
    gambar: "wawancara.png",
    tags: "kerja,wawancara,hrd",
    created_at: "2025-04-09"
  },
  {
    judul: "Resep Nasi Goreng Anti Gagal",
    deskripsi: "Rahasia bumbu nasi goreng rumahan seenak restoran.",
    kategori: "Kuliner",
    gambar: "nasgor.png",
    tags: "masak,nasi,goreng",
    created_at: "2025-04-09"
  },
  {
    judul: "Cara Membuat Portofolio Desain",
    deskripsi: "Tunjukkan karya terbaikmu dengan cara yang profesional.",
    kategori: "Desain",
    gambar: "portofolio.png",
    tags: "desain,ui,ux,figma",
    created_at: "2025-04-09"
  },
  {
    judul: "Trik Belajar Cepat & Fokus",
    deskripsi: "Cocok untuk pelajar dan mahasiswa menjelang ujian.",
    kategori: "Pendidikan",
    gambar: "belajar.png",
    tags: "fokus,belajar,ujian",
    created_at: "2025-04-09"
  },
  {
    judul: "Cara Menabung 10 Juta Setahun",
    deskripsi: "Langkah-langkah finansial untuk generasi muda.",
    kategori: "Keuangan",
    gambar: "nabung.png",
    tags: "uang,hemat,saving",
    created_at: "2025-04-09"
  },
  {
    judul: "Tutorial Dasar Git & GitHub",
    deskripsi: "Version control tanpa drama.",
    kategori: "Pemrograman",
    gambar: "git.png",
    tags: "git,github,dev",
    created_at: "2025-04-09"
  },
  {
    judul: "Tips Memulai Bisnis Online",
    deskripsi: "Cocok buat pelajar, ibu rumah tangga, dan freelancer.",
    kategori: "Bisnis",
    gambar: "bisnis.png",
    tags: "jualan,olshop,modal",
    created_at: "2025-04-09"
  },
  {
    judul: "Rekomendasi Buku Self Improvement",
    deskripsi: "Buku yang bisa mengubah cara pandang hidupmu.",
    kategori: "Literasi",
    gambar: "buku.png",
    tags: "buku,motivasi,pengembangan",
    created_at: "2025-04-09"
  },
  {
    judul: "Mengenal UI/UX Design",
    deskripsi: "Apa itu UX? Apa bedanya dengan UI?",
    kategori: "Desain",
    gambar: "uiux.png",
    tags: "design,uiux,produk",
    created_at: "2025-04-09"
  },
  {
    judul: "Perbedaan HTML vs CSS",
    deskripsi: "Mana yang bikin struktur, mana yang bikin cantik?",
    kategori: "Pemrograman",
    gambar: "htmlcss.png",
    tags: "html,css,web",
    created_at: "2025-04-09"
  },
  {
    judul: "Manfaat Jalan Kaki 30 Menit",
    deskripsi: "Gratis, tapi menyehatkan seluruh tubuh.",
    kategori: "Kesehatan",
    gambar: "jalan.png",
    tags: "sehat,olahraga,simple",
    created_at: "2025-04-09"
  },
  {
    judul: "Kenapa Harus Minum Air Putih?",
    deskripsi: "Fakta ilmiah di balik anjuran 8 gelas sehari.",
    kategori: "Kesehatan",
    gambar: "air.png",
    tags: "air,minum,kesehatan",
    created_at: "2025-04-09"
  },
  {
    judul: "Peta Mental: Cara Baru Merangkum",
    deskripsi: "Teknik belajar efektif untuk visual learner.",
    kategori: "Pendidikan",
    gambar: "mindmap.png",
    tags: "mindmap,belajar,rangkuman",
    created_at: "2025-04-09"
  },
  {
    judul: "5 Tools AI Gratis Bantu Produktivitas",
    deskripsi: "Kamu bisa lebih cepat ngerjain tugas pakai ini!",
    kategori: "Teknologi",
    gambar: "ai-tools.png",
    tags: "ai,gratis,tools",
    created_at: "2025-04-09"
  },
  {
    judul: "Cara Bikin CV ATS Friendly",
    deskripsi: "Agar lolos screening awal HRD modern.",
    kategori: "Karir",
    gambar: "cv.png",
    tags: "cv,kerja,ats",
    created_at: "2025-04-09"
  },
  {
    judul: "Panduan Dasar Canva untuk Pemula",
    deskripsi: "Desain brosur, IG post, presentasi dengan mudah.",
    kategori: "Desain",
    gambar: "canva.png",
    tags: "canva,desain,gratis",
    created_at: "2025-04-09"
  },
  {
    judul: "Tips Produktif saat WFH",
    deskripsi: "Biar kerja di rumah tetap disiplin dan fokus.",
    kategori: "Produktivitas",
    gambar: "wfh.png",
    tags: "kerja,wfh,fokus",
    created_at: "2025-04-09"
  },
  {
    judul: "Belajar Bahasa Inggris Otodidak",
    deskripsi: "Langkah mudah mulai dari rumah.",
    kategori: "Pendidikan",
    gambar: "inggris.png",
    tags: "bahasa,inggris,belajar",
    created_at: "2025-04-09"
  },
  {
    judul: "Kenali Emosi Lewat Jurnal Harian",
    deskripsi: "Cara sederhana menjaga kesehatan mental.",
    kategori: "Psikologi",
    gambar: "jurnal.png",
    tags: "mental,jurnal,emosi",
    created_at: "2025-04-09"
  },
  {
    judul: "Mitos vs Fakta Seputar Tidur",
    deskripsi: "Jangan langsung percaya semua tips di TikTok!",
    kategori: "Kesehatan",
    gambar: "tidur.png",
    tags: "tidur,mitos,nyenyak",
    created_at: "2025-04-09"
  }
];

// Eksekusi masukan ke DB
db.serialize(() => {
  const stmt = db.prepare(`
    INSERT INTO konten (judul, deskripsi, kategori, gambar, tags, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  data.forEach(item => {
    stmt.run([
      item.judul,
      item.deskripsi,
      item.kategori,
      item.gambar,
      item.tags,
      item.created_at
    ]);
  });

  stmt.finalize();
  console.log("✅ Dummy data berhasil diimport ke database.");

  db.close((err) => {
    if (err) {
      console.error("❌ Gagal menutup database:", err.message);
    } else {
      console.log("✅ Database ditutup.");
    }
  });
});
