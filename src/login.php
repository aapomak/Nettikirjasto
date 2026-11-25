<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: kirjaudu.html');
    exit;
}

$username = trim($_POST['username'] ?? '');
$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

if ($username === '' || $email === '' || $password === '') {
    header('Location: kirjaudu.html?virhe=1');
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

    $stmt = $pdo->prepare(
        'SELECT id, username, email, password
         FROM kayttajat
         WHERE username = :username AND email = :email
         LIMIT 1'
    );
    $stmt->execute([
        'username' => $username,
        'email' => $email,
    ]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        session_regenerate_id(true);
        $_SESSION['user_id'] = (int) $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['email'] = $user['email'];

        header('Location: index.php');
        exit;
    }

    header('Location: kirjaudu.html?virhe=1');
    exit;
} catch (Throwable $error) {
    error_log('Kirjautumisvirhe: ' . $error->getMessage());
    header('Location: kirjaudu.html?virhe=2');
    exit;
}
