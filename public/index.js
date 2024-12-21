
async function fetchInventory() {
    const response = await fetch('../src/php/get_inventory.php');
    const data = await response.json();
    const tableBody = document.querySelector('#inventoryTable tbody');
    tableBody.innerHTML = ''; // Kosongkan tabel sebelum menambahkan data

    data.forEach(item => {
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = item.fruit_name;
        row.insertCell(1).innerText = item.quantity;
        row.insertCell(2).innerText = item.is_available ? 'Ya' : 'Tidak';
        row.insertCell(3).innerText = item.fruit_type;
    });
}

function searchTable() {
    const input = document.getElementById('searchBar');
    const filter = input.value.toLowerCase();
    const table = document.getElementById('inventoryTable');
    const tr = table.getElementsByTagName('tr');

    // Loop through semua baris tabel, kecuali baris header
    for (let i = 1; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName('td');
        let rowContainsSearchTerm = false;

        // Loop melalui semua sel dalam baris
        for (let j = 0; j < td.length; j++) {
            if (td[j]) {
                const cellValue = td[j].textContent || td[j].innerText;
                if (cellValue.toLowerCase().indexOf(filter) > -1) {
                    rowContainsSearchTerm = true;
                    break; // Jika ditemukan, tidak perlu memeriksa sel lainnya
                }
            }
        }

        // Tampilkan atau sembunyikan baris berdasarkan hasil pencarian
        tr[i].style.display = rowContainsSearchTerm ? '' : 'none';
    }
}

window.onload = fetchInventory;
