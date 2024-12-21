
// Fungsi untuk menetapkan cookie
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
}

// Fungsi untuk mendapatkan cookie
function getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
}

// Fungsi untuk menghapus cookie
function deleteCookie(name) {
    setCookie(name, '', -1);
}

// Fungsi untuk mengambil data dari server
async function fetchInventory() {
    const response = await fetch('../src/php/get_inventory.php');
    const data = await response.json();
    const table = document.getElementById('inventoryTable');

    // Mengosongkan tabel sebelum menambahkan data baru
    table.innerHTML = `
        <tr>
            <th>Nama Buah</th>
            <th>Jumlah</th>
            <th>Tersedia</th>
            <th>Jenis Buah</th>
            <th>Aksi</th>
        </tr>
    `;

    // Menambahkan data ke tabel
    data.forEach(item => {
        const row = table.insertRow();
        row.insertCell(0).innerText = item.fruit_name;
        row.insertCell(1).innerText = item.quantity;
        row.insertCell(2).innerText = item.is_available ? 'Ya' : 'Tidak';
        row.insertCell(3).innerText = item.fruit_type;

        // Menambahkan tombol hapus
        const deleteCell = row.insertCell(4);
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Hapus';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = () => deleteInventory(item.id);
        deleteCell.appendChild(deleteButton);
    });
}

// Fungsi untuk mencari inventori
function searchInventory() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const table = document.getElementById('inventoryTable');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let found = false;

        for (let j = 0; j < cells.length - 1; j++) { // Mengabaikan kolom aksi
            if (cells[j].innerText.toLowerCase().includes(input)) {
                found = true;
                break;
            }
        }
        rows[i].style.display = found ? '' : 'none'; // Menampilkan atau menyembunyikan baris
    }
}

// Fungsi untuk menghapus inventori
async function deleteInventory(id) {
    const response = await fetch(`../src/php/delete_inventory.php?id=${id}`, {
        method: 'DELETE'
    });
    const result = await response.json();

    // Menampilkan popup jika data berhasil dihapus
    const popup = document.getElementById('popup');
    popup.innerText = result.message;
    popup.style.display = 'block';

    // Menghilangkan popup setelah 3 detik
    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);

    // Memperbarui tabel inventori
    if (result.success) {
        fetchInventory(); // Memanggil fungsi untuk memperbarui tabel
    }
}

// Menangani pengiriman form
document.getElementById('fruitForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Mencegah pengiriman form default

    const formData = new FormData(this);
    const response = await fetch(this.action, {
        method: 'POST',
        body: formData
    });
    const result = await response.json();

    // Menampilkan popup jika data berhasil disimpan
    const popup = document.getElementById('popup');
    popup.innerText = result.message;
    popup.style.display = 'block';

    // Menghilangkan popup setelah 3 detik
    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);

    // Mengosongkan form setelah pengiriman
    this.reset();

    // Memperbarui tabel inventori
    if (result.success) {
        fetchInventory(); // Memanggil fungsi untuk memperbarui tabel

        // Simpan data ke Local Storage
        const fruitData = {
            name: formData.get('fruitName'),
            quantity: formData.get('quantity'),
            isAvailable: formData.get('isAvailable') ? true : false,
            fruitType: formData.get('fruitType')
        };

        // Ambil data yang sudah ada di Local Storage
        let fruits = JSON.parse(localStorage.getItem('fruits')) || [];
        fruits.push(fruitData);
        localStorage.setItem('fruits', JSON.stringify(fruits));
    }
});

// Memuat data dari Local Storage
function loadLocalStorageData() {
    const fruits = JSON.parse(localStorage.getItem('fruits')) || [];
    const table = document.getElementById('inventoryTable');

    // Mengosongkan tabel sebelum menambahkan data baru
    table.innerHTML = `
        <tr>
            <th>Nama Buah</th>
            <th>Jumlah</th>
            <th>Tersedia</th>
            <th>Jenis Buah</th>
            <th>Aksi</th>
        </tr>
    `;

    // Menambahkan data ke tabel
    fruits.forEach((item, index) => {
        const row = table.insertRow();
        row.insertCell(0).innerText = item.name;
        row.insertCell(1).innerText = item .quantity;
        row.insertCell(2).innerText = item.isAvailable ? 'Ya' : 'Tidak';
        row.insertCell(3).innerText = item.fruitType;

        // Menambahkan tombol hapus
        const deleteCell = row.insertCell(4);
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Hapus';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = () => {
            // Hapus dari Local Storage
            fruits.splice(index, 1);
            localStorage.setItem('fruits', JSON.stringify(fruits));
            loadLocalStorageData(); // Memperbarui tampilan tabel
        };
        deleteCell.appendChild(deleteButton);
    });
}

// Memanggil fungsi untuk memuat data dari Local Storage saat halaman dimuat
window.onload = function() {
    fetchInventory(); // Memuat data dari server
    loadLocalStorageData(); // Memuat data dari Local Storage
};
