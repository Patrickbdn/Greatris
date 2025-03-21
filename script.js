// Définition des formes des Tetriminos avec couleurs
const tetriminos = {
  I: {
    rotations: [
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
    color: "cyan" // Cyan pour les pièces I
  },
  O: {
    rotations: [
      [
        [1, 1],
        [1, 1],
      ],
    ],
    color: "yellow" // Jaune pour les pièces O
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
    color: "purple" // Violet pour les pièces T
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
    color: "green" // Vert pour les pièces U
  },
};

// Initialisation de la grille et des variables
const nbLignes = 20;
const nbColonnes = 10;
let grille = Array.from({ length: nbLignes }, () =>
  Array(nbColonnes).fill({ type: " " })
);
let posX = Math.floor(nbColonnes / 2) - 1;
let posY = 0;
let rotationIndex = 0;
let currentTetriminoType = "";
let currentTetrimino = choisirTetriminoAleatoire();

// Fonction pour choisir un Tetrimino aléatoire
function choisirTetriminoAleatoire() {
  const formesDisponibles = Object.keys(tetriminos);
  currentTetriminoType = formesDisponibles[Math.floor(Math.random() * formesDisponibles.length)];
  return tetriminos[currentTetriminoType];
}

// Fonction pour afficher la grille dans le HTML
function afficherGrille() {
  const gridElement = document.getElementById("grid");
  
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
          (newY >= 0 && grille[newY][newX].type === "■")
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
      if (grille[i][j].type === "X" || grille[i][j].type === "O") {
        grille[i][j] = { type: " " };
      }
    }
  }

  // Affiche le fantôme si ce n'est pas pour effacer
  if (!effacer) {
    afficherFantome(x, y);
  }

  // Affiche la pièce en mouvement
  const forme = currentTetrimino.rotations[rotationIndex];
  for (let i = 0; i < forme.length; i++) {
    for (let j = 0; j < forme[i].length; j++) {
      if (forme[i][j] === 1) {
        grille[y + i][x + j] = effacer 
          ? { type: " " } 
          : { type: "X", color: currentTetrimino.color };
      }
    }
  }
}

// Fonction pour afficher le fantôme
function afficherFantome(x, y) {
  let ghostY = y;

  // Descend la pièce jusqu'à la première collision
  while (!collision(x, ghostY + 1, currentTetrimino.rotations[rotationIndex])) {
    ghostY++;
  }

  // Affiche la forme fantôme
  const forme = currentTetrimino.rotations[rotationIndex];
  for (let i = 0; i < forme.length; i++) {
    for (let j = 0; j < forme[i].length; j++) {
      if (forme[i][j] === 1) {
        grille[ghostY + i][x + j] = { type: "O", color: currentTetrimino.color }; // Représente le fantôme
      }
    }
  }
}

// Fonction pour fixer un Tetrimino dans la grille
function fixerTetrimino(x, y) {
  const forme = currentTetrimino.rotations[rotationIndex];
  for (let i = 0; i < forme.length; i++) {
    for (let j = 0; j < forme[i].length; j++) {
      if (forme[i][j] === 1) {
        grille[y + i][x + j] = { type: "■", color: currentTetrimino.color }; // Marque comme fixé avec couleur
      }
    }
  }
  nettoyerLignes();
}

// Fonction pour nettoyer les lignes pleines
function nettoyerLignes() {
  for (let i = 0; i < nbLignes; i++) {
    if (grille[i].every((cell) => cell.type === "■")) {
      grille.splice(i, 1);
      grille.unshift(Array(nbColonnes).fill({ type: " " }));
    }
  }
}

// Gestion des touches
document.addEventListener("keydown", function (event) {
  afficherTetrimino(posX, posY, true);

  if (
    event.key === "ArrowLeft" &&
    !collision(posX - 1, posY, currentTetrimino.rotations[rotationIndex])
  ) {
    posX--;
  } else if (
    event.key === "ArrowRight" &&
    !collision(posX + 1, posY, currentTetrimino.rotations[rotationIndex])
  ) {
    posX++;
  } else if (
    event.key === "ArrowDown" &&
    !collision(posX, posY + 1, currentTetrimino.rotations[rotationIndex])
  ) {
    posY++;
  } else if (event.key === "ArrowUp") {
    const nextRotation = (rotationIndex + 1) % currentTetrimino.rotations.length;
    if (!collision(posX, posY, currentTetrimino.rotations[nextRotation])) {
      rotationIndex = nextRotation;
    }
  } else if (event.key === " ") {
    // Espace pour hard drop
    while (!collision(posX, posY + 1, currentTetrimino.rotations[rotationIndex])) {
      posY++;
    }
  }

  afficherTetrimino(posX, posY);
  afficherGrille();
});

// Boucle de jeu
function gameLoop() {
  afficherTetrimino(posX, posY, true);

  if (!collision(posX, posY + 1, currentTetrimino.rotations[rotationIndex])) {
    posY++;
  } else {
    fixerTetrimino(posX, posY);
    posX = Math.floor(nbColonnes / 2) - 1;
    posY = 0;
    rotationIndex = 0;
    currentTetrimino = choisirTetriminoAleatoire();

    // Vérifie le game over
    if (collision(posX, posY, currentTetrimino.rotations[rotationIndex])) {
      alert("Game Over !");
      return;
    }
  }

  afficherTetrimino(posX, posY);
  afficherGrille();

  setTimeout(gameLoop, 500);
}

// Initialisation de la page HTML
window.onload = function() {
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