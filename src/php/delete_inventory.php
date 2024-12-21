<?php
// delete_inventory.php

// Menghubungkan ke database
$servername = "localhost"; // Ganti dengan nama server Anda
$username = "root"; // Ganti dengan username database Anda
$password = ""; // Ganti dengan password database Anda
$dbname = "uaswebrendi"; // Ganti dengan nama database Anda

$conn = new mysqli($servername, $username, $password, $dbname);

// Memeriksa koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Mendapatkan ID dari query string
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id > 0) {
    // Menyiapkan dan mengeksekusi pernyataan SQL untuk menghapus
    $stmt = $conn->prepare("DELETE FROM inventory WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        // Mengembalikan respons sukses
        echo json_encode(['success' => true, 'message' => 'Data berhasil dihapus.']);
    } else {
        // Mengembalikan respons gagal
        echo json_encode(['success' => false, 'message' => 'Gagal menghapus data.']);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'ID tidak valid.']);
}

$conn->close();
?>