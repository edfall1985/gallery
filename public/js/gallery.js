// File: public/js/gallery.js
// Mode: READ (Tampilan Publik)
// Modul ini hanya untuk menampilkan konten ke user, tanpa fungsi CRUD.

// AMBIL ELEMEN DOM YANG DIPERLUKAN 
const galleryContainer = document.getElementById("gallery-container");
const kategoriFilter = document.getElementById("filter-kategori");
const searchInput = document.getElementById("search-judul");

let kontenData = [];

// FETCH DATA KONTEN DARI BACKEND 
async function fetchKonten() {
  try {
    const response = await fetch("/api/content");
    const data = await response.json();
    kontenData = data;
    renderKonten(kontenData);
    populateKategoriFilter(kontenData);
  } catch (err) {
    console.error("Gagal mengambil data konten:", err);
  }
}

// RENDER DATA KONTEN KE HALAMAN 
function renderKonten(data) {
  galleryContainer.innerHTML = "";
  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "konten-card";
    card.innerHTML = `
      <img src="${item.gambar}" alt="${item.judul}" class="konten-gambar">
      <div class="konten-info">
        <h3 class="konten-judul">${item.judul}</h3>
        <p class="konten-deskripsi">${item.deskripsi}</p>
      </div>
    `;
    galleryContainer.appendChild(card);
  });
}

// GENERATE OPSI KATEGORI DARI DATA 
function populateKategoriFilter(data) {
  const kategoriSet = new Set(data.map(item => item.kategori));
  kategoriFilter.innerHTML = `<option value="">Semua Kategori</option>`;
  kategoriSet.forEach(kat => {
    const option = document.createElement("option");
    option.value = kat;
    option.textContent = kat;
    kategoriFilter.appendChild(option);
  });
}

// EVENT UNTUK FILTER OTOMATIS
kategoriFilter.addEventListener("change", filterKonten);
searchInput.addEventListener("input", filterKonten);

function filterKonten() {
  const selectedKategori = kategoriFilter.value.toLowerCase();
  const searchText = searchInput.value.toLowerCase();
  const filtered = kontenData.filter(item => {
    const matchKategori = selectedKategori ? item.kategori.toLowerCase() === selectedKategori : true;
    const matchJudul = item.judul.toLowerCase().includes(searchText);
    return matchKategori && matchJudul;
  });
  renderKonten(filtered);
}

// INISIALISASI SAAT HALAMAN DILOAD
fetch("https://api.digtri.com/api/content")

// Author:
// Edfall 2025
// Education For All
