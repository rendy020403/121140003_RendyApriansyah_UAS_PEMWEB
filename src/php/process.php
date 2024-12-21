<?php
session_start();
include 'db.php'; // Pastikan ini menghubungkan ke database dengan benar
include 'Buah.php'; // Sertakan file kelas Buah

$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Ambil data dari form
    $fruitName = $_POST['fruitName'];
    $quantity = $_POST['quantity'];
    $isAvailable = isset($_POST['isAvailable']) ? 1 : 0; // Jika checkbox tidak dicentang, nilai 0
    $fruitType = $_POST['fruitType'];

    // Validasi data
    if (empty($fruitName) || $quantity <= 0) {
        $response['message'] = 'Nama buah dan jumlah harus diisi dengan benar.';
    } else {
        // Buat objek Buah
        $buah = new Buah($pdo, $fruitName, $quantity, $isAvailable, $fruitType);
        
        // Simpan ke database
        if ($buah->simpan()) {
            $response['success'] = true;
            $response['message'] = 'Data berhasil disimpan!';
        } else {
            $response['message'] = 'Gagal menyimpan data.';
        }
    }
} else {
    $response['message'] = 'Metode tidak valid.';
}

$_SESSION['username'] = 'RENDY APRIANSYAH'; 
$_SESSION['user_id'] = 1; 
// Set cookie
setcookie('user', $_SESSION['username'], time() + (86400 * 30), "/");

// Mengembalikan respons dalam format JSON
header('Content-Type: application/json');
echo json_encode($response);
?>