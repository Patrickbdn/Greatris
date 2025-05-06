<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();

// Connexion à la base de données
$conn = new mysqli("127.0.0.1", "root", "", "tetris");

if ($conn->connect_error) {
    die("Erreur de connexion à la base de données : " . $conn->connect_error);
}

// Vérifier si la requête est de type POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $pseudo = isset($_POST['pseudo']) ? $conn->real_escape_string($_POST['pseudo']) : '';
    $email = isset($_POST['email']) ? $conn->real_escape_string($_POST['email']) : '';
    $password = isset($_POST['password']) ? password_hash($_POST['password'], PASSWORD_BCRYPT) : '';

    if (empty($pseudo) || empty($email) || empty($password)) {
        echo "Tous les champs sont obligatoires. <a href='register.php'>Retour</a>";
        exit;
    }

    // Vérifier si le pseudo ou l'email existe déjà
    $query = "SELECT id FROM users WHERE pseudo = ? OR email = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ss", $pseudo, $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo "Pseudo ou email déjà utilisé. <a href='register.php'>Retour</a>";
    } else {
        // Insérer l'utilisateur dans la base de données
        $query = "INSERT INTO users (pseudo, email, password) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("sss", $pseudo, $email, $password);

        if ($stmt->execute()) {
            echo "Compte créé avec succès. <a href='index.php'>Connectez-vous ici</a>";
        } else {
            echo "Erreur lors de la création du compte : " . $conn->error;
        }
    }
    exit;
}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Créer un compte</title>
</head>

<body>
    <h1>Créer un compte</h1>
    <form action="register.php" method="POST">
        <label for="pseudo">Pseudo :</label>
        <input type="text" id="pseudo" name="pseudo" required>
        <br>
        <label for="email">Email :</label>
        <input type="email" id="email" name="email" required>
        <br>
        <label for="password">Mot de passe :</label>
        <input type="password" id="password" name="password" required>
        <br>
        <button type="submit">S'inscrire</button>
    </form>
</body>

</html>