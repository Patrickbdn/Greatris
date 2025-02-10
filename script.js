// Définition des formes des Tetriminos
const tetriminos = {
  I: [
    // lettre I
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
  ],
  O: [
    // lettre O
    [
      [1, 1],
      [1, 1],
    ],
  ],
  T: [
    // lettre T
    [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
    [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 0],
    ],
  ],
  L: [
    // lettre L
    [
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 0],
    ],
    [
      [1, 1, 0],
      [1, 0, 0],
      [1, 0, 0],
    ],
    [
      [0, 1, 1],
      [0, 0, 1],
      [0, 0, 1],
    ],
    [
      [0, 0, 1],
      [0, 0, 1],
      [0, 1, 1],
    ],
  ],
  J: [
    // lettre J
    [
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 0],
    ],
    [
      [0, 0, 1],
      [0, 0, 1],
      [0, 1, 1],
    ],
    [
      [1, 1, 0],
      [1, 0, 0],
      [1, 0, 0],
    ],
    [
      [0, 1, 1],
      [0, 0, 1],
      [0, 0, 1],
    ],
  ],

  S: [
    // lettre S
    [
      [0, 1, 1],
      [1, 1, 0],
    ],
    [
      [1, 0],
      [1, 1],
      [0, 1],
    ],
    [
      [0, 1],
      [1, 1],
      [1, 0],
    ],
    [
      [1, 1, 0],
      [0, 1, 1],
    ],
  ],
  Z: [
    // lettre Z
    [
      [1, 1, 0],
      [0, 1, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [0, 1],
    ],
    [
      [0, 1],
      [1, 1],
      [1, 0],
    ],
    [
      [0, 1, 1],
      [1, 1, 0],
    ],
  ],

  X: [
    // lettre X
    [
      [1, 0, 1],
      [1, 1, 1],
      [1, 0, 1],
    ],
    [
      [1, 1, 1],
      [0, 1, 0],
      [1, 1, 1],
    ],
  ],
};

// Initialisation de la grille et des variables
const nbLignes = 20;
const nbColonnes = 10;
let grille = Array.from({ length: nbLignes }, () =>
  Array(nbColonnes).fill(" ")
);
let posX = Math.floor(nbColonnes / 2) - 1;
let posY = 0;
let rotationIndex = 0;
let currentTetrimino = choisirTetriminoAleatoire();
let score = 0;

// Fonction pour choisir un Tetrimino aléatoire
function choisirTetriminoAleatoire() {
  const formesDisponibles = Object.keys(tetriminos);
  const formeChoisie =
    formesDisponibles[Math.floor(Math.random() * formesDisponibles.length)];
  return tetriminos[formeChoisie];
}

// Fonction pour afficher la grille dans le HTML
function afficherGrille() {
  const gridElement = document.getElementById("grid");
  gridElement.innerHTML = grille.map((row) => row.join(" ")).join("<br>");
}

// Fonction pour vérifier les collisions
function collision(x, y, forme) {
  for (let i = 0; i < forme.length; i++) {
    for (let j = 0; j < forme[i].length; j++) {
      if (forme[i][j] === 1) {
        let newX = x + j;
        let newY = y + i;
        if (
          newX < 0 ||
          newX >= nbColonnes ||
          newY >= nbLignes ||
          (newY >= 0 && grille[newY][newX] !== " ")
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

// Fonction pour afficher un Tetrimino dans la grille
function afficherTetrimino(x, y, effacer = false) {
  // Nettoyer les pièces en mouvement et le fantôme
  for (let i = 0; i < nbLignes; i++) {
    for (let j = 0; j < nbColonnes; j++) {
      if (grille[i][j] === "X" || grille[i][j] === "O") {
        grille[i][j] = " ";
      }
    }
  }

  // Affiche le fantôme si ce n'est pas pour effacer
  if (!effacer) {
    afficherFantome(x, y);
  }

  // Affiche la pièce en mouvement
  const forme = currentTetrimino[rotationIndex];
  for (let i = 0; i < forme.length; i++) {
    for (let j = 0; j < forme[i].length; j++) {
      if (forme[i][j] === 1) {
        grille[y + i][x + j] = effacer ? " " : "X";
      }
    }
  }
}

// Fonction pour afficher le fantôme
function afficherFantome(x, y) {
  let ghostY = y;

  // Descend la pièce jusqu'à la première collision
  while (!collision(x, ghostY + 1, currentTetrimino[rotationIndex])) {
    ghostY++;
  }

  // Affiche la forme fantôme
  const forme = currentTetrimino[rotationIndex];
  for (let i = 0; i < forme.length; i++) {
    for (let j = 0; j < forme[i].length; j++) {
      if (forme[i][j] === 1) {
        grille[ghostY + i][x + j] = "O"; // Représente le fantôme
      }
    }
  }
}

// Fonction pour fixer un Tetrimino dans la grille
function fixerTetrimino(x, y) {
  const forme = currentTetrimino[rotationIndex];
  for (let i = 0; i < forme.length; i++) {
    for (let j = 0; j < forme[i].length; j++) {
      if (forme[i][j] === 1) {
        grille[y + i][x + j] = "■"; // Marque comme fixé
      }
    }
  }
  nettoyerLignes();
}

// Fonction pour nettoyer les lignes pleines
function nettoyerLignes() {
  let lignesEffacees = 0; // Compteur du nombre de lignes effacées
  for (let i = 0; i < nbLignes; i++) {
    if (grille[i].every((cell) => cell === "■")) {
      grille.splice(i, 1);
      grille.unshift(Array(nbColonnes).fill(" "));
      lignesEffacees++; // Incrémente le nombre de lignes effacées
    }
  }
  function afficherScore() {
    document.getElementById("score").innerText = "Score : " + score;
  }

  // Ajoute 10 points par ligne effacée
  score += lignesEffacees * 10;
  afficherScore(); // Met à jour l'affichage du score
}

// Gestion des touches
document.addEventListener("keydown", function (event) {
  afficherTetrimino(posX, posY, true);

  if (
    event.key === "ArrowLeft" &&
    !collision(posX - 1, posY, currentTetrimino[rotationIndex])
  ) {
    posX--;
  } else if (
    event.key === "ArrowRight" &&
    !collision(posX + 1, posY, currentTetrimino[rotationIndex])
  ) {
    posX++;
  } else if (
    event.key === "ArrowDown" &&
    !collision(posX, posY + 1, currentTetrimino[rotationIndex])
  ) {
    posY++;
  } else if (event.key === "ArrowUp") {
    const nextRotation = (rotationIndex + 1) % currentTetrimino.length;
    if (!collision(posX, posY, currentTetrimino[nextRotation])) {
      rotationIndex = nextRotation;
    }
  }

  afficherTetrimino(posX, posY);
  afficherGrille();
});

// Boucle de jeu
function gameLoop() {
  afficherTetrimino(posX, posY, true);

  if (!collision(posX, posY + 1, currentTetrimino[rotationIndex])) {
    posY++;
  } else {
    fixerTetrimino(posX, posY);
    posX = Math.floor(nbColonnes / 2) - 1;
    posY = 0;
    rotationIndex = 0;
    currentTetrimino = choisirTetriminoAleatoire();

    // Vérifie le game over
    if (collision(posX, posY, currentTetrimino[rotationIndex])) {
      alert("Game Over !");
      return;
    }
  }

  afficherTetrimino(posX, posY);
  afficherGrille();

  setTimeout(gameLoop, 500);
}

// Initialisation du jeu
afficherGrille();
gameLoop();
