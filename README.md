## Biodata Diri
### Nama  : Rendy Apriansyah
### NIM   : 121140003
### Matkul: Pemweb


## Deskripsi Proyek
Proyek ini adalah aplikasi web inventori buah yang dibangun menggunakan HTML, CSS, JavaScript, dan PHP. Aplikasi ini memungkinkan pengguna untuk menambahkan, menghapus, dan mencari data buah dalam inventori. Data disimpan dalam database MySQL dan dikelola menggunakan PHP.

## Struktur Proyek
Proyek ini terdiri dari beberapa bagian yang saling berkaitan, yaitu:

### Bagian 1: Client-side Programming 

#### 1.1 Manipulasi DOM dengan JavaScript 
- **Form Input**: Terdapat form input dengan empat elemen input: teks (Nama Buah), checkbox (Tersedia), radio (Jenis Buah), dan number (Jumlah).
- **Tabel HTML**: Data dari server ditampilkan dalam tabel HTML yang diisi dengan data inventori buah.
- **Manipulasi DOM**: Menggunakan JavaScript untuk menambahkan dan menghapus elemen dari DOM.

#### 1.2 Event Handling 
- **Event Handling**: Terdapat tiga event yang berbeda untuk menangani form, termasuk:
  - Event `submit` untuk mengirim data ke server.
  - Event `keyup` untuk mencari data dalam tabel.
  - Event `click` untuk menghapus data dari tabel.
- **Form Validation**: Validasi dilakukan di sisi klien untuk memastikan semua input diisi dengan benar sebelum diproses oleh PHP.

### Bagian 2: Server-side Programming 

#### 2.1 Pengelolaan Data dengan PHP 
- **Metode POST**: Data dari form dikirim menggunakan metode POST.
- **Validasi Data**: Data yang diterima dari form divalidasi di sisi server sebelum disimpan ke database.
- **Menyimpan Data**: Data disimpan ke dalam database MySQL, termasuk informasi jenis browser dan alamat IP pengguna.

#### 2.2 Objek PHP Berbasis OOP 
- **Class Buah**: Dibuat kelas `Buah` yang memiliki metode untuk menyimpan data ke database dan mengembalikan data dalam format array.
- **Penggunaan OOP**: Kelas ini digunakan dalam proses penyimpanan data dari form.

### Bagian 3: Database Management 

#### 3.1 Pembuatan Tabel Database 
- **Tabel Inventory**: Tabel `inventory` dibuat di database untuk menyimpan data buah.

#### 3.2 Konfigurasi Koneksi Database 
- **Koneksi DB**: Koneksi ke database dilakukan menggunakan PDO untuk keamanan dan kemudahan dalam pengelolaan data.

#### 3.3 Manipulasi Data pada Database 
- **CRUD Operations**: Implementasi operasi Create, Read, Update, dan Delete pada tabel `inventory`.

### Bagian 4: State Management 

#### 4.1 State Management dengan Session 
- **Session Management**: Menggunakan `session_start()` untuk memulai session dan menyimpan informasi pengguna ke dalam session.

#### 4.2 Pengelolaan State dengan Cookie dan Browser Storage 
- **Cookie Management**: Fungsi untuk menetapkan, mendapatkan, dan menghapus cookie digunakan untuk menyimpan informasi pengguna.
- **Browser Storage**: Data inventori juga disimpan di Local Storage untuk akses cepat dan offline.


## Cara Menjalankan Proyek
1. Pastikan Anda memiliki server lokal (seperti XAMPP atau MAMP) yang berjalan.
2. Buat database baru dengan nama `uaswebrendi` dan jalankan skrip SQL untuk membuat tabel `inventory`.
3. Upload semua file ke folder `htdocs` (atau folder yang sesuai) 4. Akses aplikasi melalui browser dengan membuka `http://localhost/nama_folder_proyek/`.
5. Ikuti instruksi di aplikasi untuk menambahkan, menghapus, dan mencari data buah dalam inventori.


## Kontak
Jika ada pertanyaan atau masukan, silakan hubungi saya di rendy.121140003@student.itera.ac.id.
