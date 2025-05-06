<?php
// Démarrage de la session
session_start();

// Configuration de la base de données
$db_host = 'localhost';
$db_user = 'root';  // Remplacez par votre utilisateur MySQL
$db_pass = '';      // Remplacez par votre mot de passe MySQL
$db_name = 'tetris';

// Connexion à la base de données
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

// Vérification de la connexion
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Erreur de connexion à la base de données']));
}

// Fonction pour sécuriser les données
function sanitize($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Traitement des requêtes
$action = isset($_POST['action']) ? $_POST['action'] : (isset($_GET['action']) ? $_GET['action'] : '');

switch ($action) {
    case 'login':
        // Récupération des données du formulaire
        $username = sanitize($_POST['username']);
        $password = $_POST['password'];

        // Vérification des identifiants
        $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();
            
            // Vérification du mot de passe
            if (password_verify($password, $user['password'])) {
                // Connexion réussie
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['username'] = $user['username'];
                
                echo json_encode(['success' => true]);
            } else {
                // Mot de passe incorrect
                echo json_encode(['success' => false, 'message' => 'Nom d\'utilisateur ou mot de passe incorrect']);
            }
        } else {
            // Utilisateur non trouvé
            echo json_encode(['success' => false, 'message' => 'Nom d\'utilisateur ou mot de passe incorrect']);
        }
        break;

    case 'register':
        // Récupération des données du formulaire
        $username = sanitize($_POST['username']);
        $password = $_POST['password'];
        
        // Vérification si l'utilisateur existe déjà
        $stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            // Utilisateur déjà existant
            echo json_encode(['success' => false, 'message' => 'Ce nom d\'utilisateur est déjà utilisé']);
        } else {
            // Hashage du mot de passe
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            
            // Insertion de l'utilisateur
            $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
            $stmt->bind_param("ss", $username, $hashed_password);
            
            if ($stmt->execute()) {
                // Inscription réussie
                echo json_encode(['success' => true]);
            } else {
                // Erreur lors de l'inscription
                echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'inscription']);
            }
        }
        break;

    case 'logout':
        // Destruction de la session
        session_unset();
        session_destroy();
        echo json_encode(['success' => true]);
        break;

    case 'check_session':
        // Vérification si l'utilisateur est connecté
        if (isset($_SESSION['user_id'])) {
            echo json_encode(['loggedIn' => true, 'username' => $_SESSION['username']]);
        } else {
            echo json_encode(['loggedIn' => false]);
        }
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Action non reconnue']);
}

// Fermeture de la connexion
$conn->close();
?>