<?php
include 'db.php'; // Pastikan ini menghubungkan ke database dengan benar

header('Content-Type: application/json');

// Mengambil semua data dari tabel inventory, urutkan berdasarkan id secara menurun
$stmt = $pdo->query("SELECT * FROM inventory ORDER BY id DESC");
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Mengembalikan data dalam format JSON
echo json_encode($data);
?>