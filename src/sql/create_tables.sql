CREATE TABLE IF NOT EXISTS inventory (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    fruit_name VARCHAR(255) NOT NULL,
    quantity INT(11) NOT NULL,
    is_available TINYINT(1) NOT NULL,
    fruit_type ENUM('Tropis', 'Non-Tropis') NOT NULL
);