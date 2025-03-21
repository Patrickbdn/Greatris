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
<<<<<<< HEAD
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
=======
    color: "cyan", // Cyan pour les pièces I
  },
  O: {
    rotations: [
      [
        [1, 1],
        [1, 1],
      ],
    ],
    color: "red", // Rouge pour les pièces O
  },
  T: {
    rotations: [
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
    color: "purple", // Violet pour les pièces T
  },
  U: {
    rotations: [
      [
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
      ],
      [
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 1],
      ],
      [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
      ],
      [
        [1, 1, 1],
        [0, 0, 1],
        [1, 1, 1],
      ],
    ],
    color: "green", // Vert pour les pièces U
  },
>>>>>>> cad18ff (pièces en couleur)
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
<<<<<<< HEAD
  const formeChoisie =
    formesDisponibles[Math.floor(Math.random() * formesDisponibles.length)];
  return tetriminos[formeChoisie];
=======
  currentTetriminoType =
    formesDisponibles[Math.floor(Math.random() * formesDisponibles.length)];
  return tetriminos[currentTetriminoType];
>>>>>>> cad18ff (pièces en couleur)
}

// Fonction pour afficher la grille dans le HTML
function afficherGrille() {
  const gridElement = document.getElementById("grid");
<<<<<<< HEAD
  gridElement.innerHTML = grille.map((row) => row.join(" ")).join("<br>");
=======

  // Style pour la grille
  gridElement.style.display = "grid";
  gridElement.style.gridTemplateColumns = `repeat(${nbColonnes}, 20px)`;
  gridElement.style.gridTemplateRows = `repeat(${nbLignes}, 20px)`;
  gridElement.style.gap = "1px";
  gridElement.style.backgroundColor = "transparent";
  gridElement.style.border = "none";
  gridElement.style.padding = "0";

  // Vider la grille
  gridElement.innerHTML = "";

  // Remplir avec les cellules
  for (let i = 0; i < nbLignes; i++) {
    for (let j = 0; j < nbColonnes; j++) {
      const cell = grille[i][j];
      const cellElement = document.createElement("div");

      cellElement.style.width = "20px";
      cellElement.style.height = "20px";

      if (cell.type === "X") {
        cellElement.style.backgroundColor = cell.color;
      } else if (cell.type === "O") {
        cellElement.style.backgroundColor = cell.color;
        cellElement.style.opacity = "0.3";
      } else if (cell.type === "■") {
        cellElement.style.backgroundColor = cell.color;
      } else {
        cellElement.style.backgroundColor = "transparent";
      }

      gridElement.appendChild(cellElement);
    }
  }
>>>>>>> cad18ff (pièces en couleur)
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
<<<<<<< HEAD
        grille[y + i][x + j] = effacer ? " " : "X";
=======
        grille[y + i][x + j] = effacer
          ? { type: " " }
          : { type: "X", color: currentTetrimino.color };
>>>>>>> cad18ff (pièces en couleur)
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
<<<<<<< HEAD
        grille[ghostY + i][x + j] = "O"; // Représente le fantôme
=======
        grille[ghostY + i][x + j] = {
          type: "O",
          color: currentTetrimino.color,
        }; // Représente le fantôme
>>>>>>> cad18ff (pièces en couleur)
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
<<<<<<< HEAD
    const nextRotation = (rotationIndex + 1) % currentTetrimino.length;
    if (!collision(posX, posY, currentTetrimino[nextRotation])) {
      rotationIndex = nextRotation;
    }
=======
    const nextRotation =
      (rotationIndex + 1) % currentTetrimino.rotations.length;
    if (!collision(posX, posY, currentTetrimino.rotations[nextRotation])) {
      rotationIndex = nextRotation;
    }
  } else if (event.key === " ") {
    // Espace pour hard drop
    while (
      !collision(posX, posY + 1, currentTetrimino.rotations[rotationIndex])
    ) {
      posY++;
    }
>>>>>>> cad18ff (pièces en couleur)
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

<<<<<<< HEAD
// Initialisation du jeu
afficherGrille();
gameLoop();
=======
// Initialisation de la page HTML
window.onload = function () {
  // Créer la div du jeu si elle n'existe pas déjà
  if (!document.getElementById("grid")) {
    const gridElement = document.createElement("div");
    gridElement.id = "grid";
    document.body.appendChild(gridElement);

    // Style du body et du conteneur
    document.body.style.backgroundColor = "#111";
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
    document.body.style.height = "100vh";
    document.body.style.margin = "0";
  }

  // Lancer le jeu
  afficherGrille();
  gameLoop();
};
>>>>>>> cad18ff (pièces en couleur)
