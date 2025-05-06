<?php
session_start();

// Gestion de la connexion utilisateur
if (isset($_POST['action']) && $_POST['action'] === 'login') {
    $pseudo = $_POST['pseudo'];
    $password = $_POST['password'];

    $conn = new mysqli("127.0.0.1", "root", "", "tetris");
    if ($conn->connect_error) {
        echo json_encode(['success' => false, 'message' => 'Erreur de connexion à la base de données']);
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
            echo json_encode(['success' => true, 'redirect' => 'grille.html']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Mot de passe incorrect']);
        }
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Utilisateur non trouvé. Voulez-vous créer un compte ?',
            'redirect' => 'register.php'
        ]);
    }
    exit;
}

// Gestion de la déconnexion utilisateur
if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    session_destroy();
    echo json_encode(['success' => true]);
    exit;
}
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tetris Simple - Connexion</title>
    <link rel="stylesheet" href="../CSS/style.css" />
</head>

<body>

    <form id="login-form">
        <div class="form-group">
            <label for="loginUsername">Pseudo</label>
            <input type="text" id="loginUsername" name="pseudo" required>
        </div>
        <div class="form-group">
            <label for="loginPassword">Mot de passe</label>
            <input type="password" id="loginPassword" name="password" required>
        </div>
        <div class="auth-buttons">
            <button type="button" id="loginButton">Se connecter</button>
        </div>
    </form>

    <div id="user-info" class="hidden">
        <span>Connecté en tant que: <strong id="username-display"></strong></span>
        <button id="logout-button">Déconnexion</button>
    </div>

    <script>
        document.getElementById('loginButton').addEventListener('click', function() {
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;

            if (!username || !password) {
                alert('Veuillez remplir tous les champs');
                return;
            }

            fetch('../PHP/auth.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        pseudo: username,
                        password: password,
                    }),
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Réponse de connexion :', data);
                    if (data.success) {
                        window.location.href = data.redirect; // Redirige vers grille.html
                    } else {
                        if (data.redirect) {
                            // Proposer à l'utilisateur de s'enregistrer
                            if (confirm(data.message)) {

                                window.location.href = data.redirect; // Redirige vers register.php
                            }
                        } else {

                            alert(data.message || 'Erreur lors de la connexion');
                        }
                    }
                })
                .catch((error) => {
                    console.error('Erreur lors de la requête :', error);
                });
        });

        document.getElementById('login-form').addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(e.target);

            fetch('auth.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Redirection en cas de succès
                        window.location.href = data.redirect;
                    } else {
                        // Affichage du message d'erreur
                        if (data.redirect) {
                            if (confirm(data.message)) {
                                window.location.href = data.redirect;
                            }
                        } else {
                            alert(data.message);
                        }
                    }
                })
                .catch((error) => {
                    console.error('Erreur lors de la requête :', error);
                });
        });

        // Gestion de la déconnexion
        document.getElementById('logout-button').addEventListener('click', function() {
            fetch('index.php?action=logout')
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Déconnexion réussie');
                        window.location.reload();
                    }
                })
                .catch(error => {
                    console.error('Erreur lors de la déconnexion :', error);
                });
        });
    </script>
</body>

</html>