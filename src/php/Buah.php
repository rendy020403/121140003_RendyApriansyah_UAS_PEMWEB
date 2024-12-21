<?php
class Buah {
    private $nama;
    private $jumlah;
    private $tersedia;
    private $jenis;
    private $pdo; // Menyimpan koneksi PDO

    public function __construct($pdo, $nama, $jumlah, $tersedia, $jenis) {
        $this->pdo = $pdo; // Inisialisasi koneksi PDO
        $this->nama = $nama;
        $this->jumlah = $jumlah;
        $this->tersedia = $tersedia;
        $this->jenis = $jenis;
    }

    public function getNama() {
        return $this->nama;
    }

    public function getJumlah() {
        return $this->jumlah;
    }

    public function isTersedia() {
        return $this->tersedia;
    }

    public function getJenis() {
        return $this->jenis;
    }

    public function toArray() {
        return [
            'nama' => $this->getNama(),
            'jumlah' => $this->getJumlah(),
            'tersedia' => $this->isTersedia() ? 'Ya' : 'Tidak',
            'jenis' => $this->getJenis()
        ];
    }

    public function simpan() {
        $stmt = $this->pdo->prepare("INSERT INTO inventory (fruit_name, quantity, is_available, fruit_type) VALUES (?, ?, ?, ?)");
        return $stmt->execute([$this->nama, $this->jumlah, $this->tersedia, $this->jenis]);
    }
}
?>