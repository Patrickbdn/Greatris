<?php
header('Content-Type: application/json');
session_start();

if (isset($_GET['action']) && $_GET['action'] === 'check_session') {
    if (isset($_SESSION['user'])) {
        echo json_encode(['loggedIn' => true, 'username' => $_SESSION['user']['pseudo']]);
    } else {
        echo json_encode(['loggedIn' => false]);
    }
    exit;
}

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$conn = new mysqli("127.0.0.1", "root", "", "tetris");

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Erreur de connexion à la base de données']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $pseudo = $input['pseudo'] ?? '';
    $password = $input['password'] ?? '';

    if (empty($pseudo) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Pseudo ou mot de passe manquant']);
        exit;
    }

    $query = "SELECT id, pseudo, email, password FROM users WHERE pseudo = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $pseudo);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();

        if (password_verify($password, $user['password'])) {
            $_SESSION['user'] = [
                'id' => $user['id'],
                'pseudo' => $user['pseudo'],
                'email' => $user['email']
            ];
            echo json_encode(['success' => true, 'redirect' => '../Html/grille.html']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Mot de passe incorrect']);
        }
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Utilisateur non trouvé. Voulez-vous créer un compte ?',
            'redirect' => '../PHP/register.php'
        ]);
    }
    exit;
}