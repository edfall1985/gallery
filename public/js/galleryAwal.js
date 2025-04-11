document.addEventListener("DOMContentLoaded", async () => {
  const galleryContainer = document.getElementById("gallery");
  const kategoriSelect = document.getElementById("filter-category");
  const searchInput = document.getElementById("filter-search");
  let allData = [];

  try {
    const res = await fetch("/api/content");
    allData = await res.json();

    initFilters(allData);
    renderGallery(allData);
  } catch (err) {
    console.error("❌ Gagal ambil data konten:", err);
    galleryContainer.innerHTML = `<p class="text-danger text-center">Gagal memuat konten.</p>`;
  }

  function initFilters(data) {
    const kategoriSet = new Set(data.map(item => item.kategori));
    kategoriSet.forEach(kat => {
      const opt = document.createElement("option");
      opt.value = kat;
      opt.textContent = kat;
      kategoriSelect.appendChild(opt);
    });

    kategoriSelect.addEventListener("change", applyFilter);
    searchInput.addEventListener("input", applyFilter);
  }

  function applyFilter() {
    const kategori = kategoriSelect.value.toLowerCase();
    const keyword = searchInput.value.toLowerCase();

    const filtered = allData.filter(item => {
      const cocokKategori = !kategori || item.kategori.toLowerCase() === kategori;
      const cocokJudul = item.judul.toLowerCase().includes(keyword);
      return cocokKategori && cocokJudul;
    });

    renderGallery(filtered);
  }

  function renderGallery(data) {
    galleryContainer.innerHTML = "";

    if (data.length === 0) {
      galleryContainer.innerHTML = `<p class="text-center text-muted">Tidak ada konten yang cocok.</p>`;
      return;
    }

    data.forEach(item => {
      const col = document.createElement("div");
      col.className = "col-md-6 col-lg-4 mb-4";

      const card = document.createElement("div");
      card.className = "card h-100 shadow-sm";

      if (item.gambar) {
        const img = document.createElement("img");
        img.src = item.gambar.startsWith("http") ? item.gambar : `/uploads/${item.gambar}`;
        img.className = "card-img-top img-fluid";
        img.alt = item.judul;
        img.style.height = "200px";
        img.style.objectFit = "cover";
        card.appendChild(img);
      }

      const body = document.createElement("div");
      body.className = "card-body";

      body.innerHTML = `
        <h5 class="card-title">${item.judul}</h5>
        <p class="card-text">${item.deskripsi || "-"}</p>
        <span class="badge bg-secondary">${item.kategori}</span>
        <br><small class="text-muted">Tanggal: ${item.created_at}</small>
      `;

      card.appendChild(body);
      col.appendChild(card);
      galleryContainer.appendChild(col);
    });
  }
});
