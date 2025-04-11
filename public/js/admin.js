// public/js/admin.js

document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("kontenTableBody");
    const toastLive = document.getElementById("toastResult");
    const toastMessage = document.getElementById("toastMessage");
  
    async function loadKonten() {
      tableBody.innerHTML = "<tr><td colspan='6'>Loading...</td></tr>";
      try {
        const res = await fetch("/api/content");
        const data = await res.json();
        renderTable(data);
      } catch (err) {
        tableBody.innerHTML = `<tr><td colspan='6'>Gagal memuat data.</td></tr>`;
      }
    }
  
    function renderTable(data) {
      tableBody.innerHTML = "";
      if (data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan='6'>Belum ada konten.</td></tr>`;
        return;
      }
  
      data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.id}</td>
          <td>${item.judul}</td>
          <td>${item.kategori}</td>
          <td>${item.created_at}</td>
          <td><button class="btn btn-sm btn-warning" onclick="editKonten(${item.id})">✏️ Edit</button></td>
          <td><button class="btn btn-sm btn-danger" onclick="deleteKonten(${item.id})">🗑️ Hapus</button></td>
        `;
        tableBody.appendChild(row);
      });
    }
  
    window.deleteKonten = async (id) => {
      if (!confirm("Yakin ingin menghapus konten ini?")) return;
      try {
        const res = await fetch(`/api/content/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Gagal hapus konten");
        showToast("✅ Konten berhasil dihapus!", "success");
        loadKonten();
      } catch (err) {
        showToast("❌ " + err.message, "danger");
      }
    };
  
    window.editKonten = (id) => {
      alert("Fitur edit konten akan hadir di versi berikutnya.");
    };
  
    function showToast(message, type = "success") {
      toastMessage.textContent = message;
      toastLive.classList.remove("bg-success", "bg-danger");
      toastLive.classList.add(`bg-${type}`);
      const toast = new bootstrap.Toast(toastLive);
      toast.show();
    }
  
    function hapusKonten(id) {
        if (!confirm("Yakin ingin menghapus konten ini?")) return;
      
        console.log("🔨 Mulai hapus konten ID:", id);
      
        fetch(`/api/content/${id}`, { method: "DELETE" })
          .then(res => {
            if (!res.ok) throw new Error("Gagal menghapus konten");
            console.log("✅ Konten berhasil dihapus");
            location.reload();
          })
          .catch(err => {
            console.error("❌ ERROR saat hapus:", err);
            alert("Gagal menghapus konten.");
          });
      }


    loadKonten();
  });
  