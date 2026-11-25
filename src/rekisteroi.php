<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: rekisteröityminen.html');
    exit;
}

$username = trim($_POST['username'] ?? '');
$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$passwordConfirm = $_POST['password_confirm'] ?? '';

if ($username === '' || $email === '' || $password === '' || $passwordConfirm === '') {
    header('Location: rekisteröityminen.html?virhe=1');
    exit;
}

if (strlen($username) < 3 || strlen($username) > 50) {
    header('Location: rekisteröityminen.html?virhe=1');
    exit;
}

if (strlen($email) > 255) {
    header('Location: rekisteröityminen.html?virhe=2');
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: rekisteröityminen.html?virhe=2');
    exit;
}

if (strlen($password) < 8) {
    header('Location: rekisteröityminen.html?virhe=3');
    exit;
}

if (!hash_equals($password, $passwordConfirm)) {
    header('Location: rekisteröityminen.html?virhe=4');
    exit;
}

try {
    $pdo = new PDO(
        'mysql:host=db;dbname=Nettikirjasto_Tietokanta;charset=utf8mb4',
        'user1',
        'pass',
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );

    $pdo->exec(
        'CREATE TABLE IF NOT EXISTS kayttajat (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            UNIQUE KEY unique_username (username),
            UNIQUE KEY unique_email (email)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4'
    );

    $stmt = $pdo->prepare(
        'SELECT id FROM kayttajat
         WHERE username = :username OR email = :email
         LIMIT 1'
    );
    $stmt->execute([
        'username' => $username,
        'email' => $email,
    ]);

    if ($stmt->fetch()) {
        header('Location: rekisteröityminen.html?virhe=5');
        exit;
    }

    $stmt = $pdo->prepare(
        'INSERT INTO kayttajat (username, email, password)
         VALUES (:username, :email, :password)'
    );
    $stmt->execute([
        'username' => $username,
        'email' => $email,
        'password' => password_hash($password, PASSWORD_DEFAULT),
    ]);

    header('Location: kirjaudu.html?onnistui=1');
    exit;
} catch (PDOException $error) {
    if ((int) $error->getCode() === 23000) {
        header('Location: rekisteröityminen.html?virhe=5');
        exit;
    }

    error_log('Rekisteröitymisvirhe: ' . $error->getMessage());
    header('Location: rekisteröityminen.html?virhe=6');
    exit;
}
