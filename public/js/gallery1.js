document.addEventListener("DOMContentLoaded", async () => {
  const galleryContainer = document.getElementById("gallery");
  const searchInput = document.getElementById("filter-search");

  let allKonten = [];

  // Fetch data dari API
  async function loadKonten() {
    try {
      const res = await fetch("konten");
      allKonten = await res.json();
      renderKonten(allKonten);
    } catch (err) {
      galleryContainer.innerHTML = "<p>Gagal memuat data konten.</p>";
    }
  }

  // Render konten ke galeri
  function renderKonten(data) {
    galleryContainer.innerHTML = ""; // clear

    if (data.length === 0) {
      galleryContainer.innerHTML = "<p>Belum ada konten.</p>";
      return;
    }

    data.forEach((item) => {
      const card = document.createElement("div");
      card.className = "col-md-4 mb-4";

      card.innerHTML = `
        <div class="card h-100">
          ${item.gambar ? `<img src="/assets/uploads/${item.gambar}" class="card-img-top" alt="${item.judul}">` : ""}
          <div class="card-body">
            <h5 class="card-title">${item.judul}</h5>
            <p class="card-text">${item.deskripsi}</p>
            <span class="badge bg-secondary">${item.kategori}</span>
          </div>
        </div>
      `;

      galleryContainer.appendChild(card);
    });
  }

  // Filter pencarian berdasarkan judul
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    const filtered = allKonten.filter((item) =>
      item.judul.toLowerCase().includes(keyword)
    );
    renderKonten(filtered);
  });

  // Jalankan
  loadKonten();
});
