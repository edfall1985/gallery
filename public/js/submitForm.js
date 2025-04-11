// public/js/submitForm.js

const form = document.getElementById("kontenForm");
const toastLive = document.getElementById("toastResult");
const toastMessage = document.getElementById("toastMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    let gambarFile = formData.get("gambar");
    let gambarName = "";

    // ✅ Upload gambar kalau ada
    if (gambarFile && gambarFile.name) {
      const uploadForm = new FormData();
      uploadForm.append("gambar", gambarFile);
      const uploadRes = await fetch("/api/content/upload", {
        method: "POST",
        body: uploadForm,
      });
      const uploadData = await uploadRes.json();
      gambarName = uploadData.filename;
    }

    // ✅ Kirim data konten
    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        judul: formData.get("judul"),
        deskripsi: formData.get("deskripsi"),
        kategori: formData.get("kategori"),
        gambar: gambarName,
      }),
    });

    if (!res.ok) throw new Error("Gagal tambah konten");

    // ✅ Reset form & tampilkan notifikasi
    form.reset();
    toastMessage.textContent = "✅ Konten berhasil ditambahkan!";
    toastLive.classList.replace("bg-danger", "bg-success");
    const toast = new bootstrap.Toast(toastLive);
    toast.show();
  } catch (err) {
    toastMessage.textContent = `❌ ${err.message}`;
    toastLive.classList.replace("bg-success", "bg-danger");
    const toast = new bootstrap.Toast(toastLive);
    toast.show();
  }
});
