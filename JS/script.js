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
    color: "blue",
  },
  O: {
    rotations: [
      [
        [1, 1],
        [1, 1],
      ],
    ],
    color: "yellow",
  },
  Q: {
    rotations: [
      [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 1],
      ],
    ],
    color: "black",
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
        [0, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
    ],
    color: "purple",
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
let currentTetrimino = choisirTetriminoAleatoire();

// Variables pour le score
let score = 0;
let niveau = 1;
let lignesEliminees = 0;

let isPaused = false;
let startTime = Date.now(); // Enregistre l'heure de début du jeu

// Pour vérifier les valeurs initiales
console.log("Début du jeu");
console.log("Score :", score, "Niveau :", niveau, "Lignes :", lignesEliminees);
console.log("Heure de début :", new Date(startTime));

// Fonction pour choisir un Tetrimino aléatoire
function choisirTetriminoAleatoire() {
  const formesDisponibles = Object.keys(tetriminos);
  const type =
    formesDisponibles[Math.floor(Math.random() * formesDisponibles.length)];
  return tetriminos[type];
}

// Fonction pour vérifier les collisions
function collision(x, y, forme) {
  for (let i = 0; i < forme.length; i++) {
    for (let j = 0; j < forme[i].length; j++) {
      if (forme[i][j] === 1) {
        const newX = x + j;
        const newY = y + i;
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

// Fonction pour afficher un Tetrimino
function afficherTetrimino(x, y, effacer = false) {
  const forme = currentTetrimino.rotations[rotationIndex];
  for (let i = 0; i < forme.length; i++) {
    for (let j = 0; j < forme[i].length; j++) {
      if (forme[i][j] === 1) {
        const newX = x + j;
        const newY = y + i;
        if (newY >= 0 && newY < nbLignes && newX >= 0 && newX < nbColonnes) {
          grille[newY][newX] = effacer
            ? { type: " " } // Efface la cellule
            : { type: "X", color: currentTetrimino.color }; // Dessine la cellule
        }
      }
    }
  }
}
// Fonction pour gérer l'explosion
function explosion(x, y) {
  console.log("Explosion déclenchée à :", x, y);

  // Parcourt les cellules autour de la position (x, y)
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const newX = x + j;
      const newY = y + i;

      // Vérifie si la cellule est dans les limites de la grille
      if (newY >= 0 && newY < nbLignes && newX >= 0 && newX < nbColonnes) {
        grille[newY][newX] = { type: " " }; // Efface la cellule
      }
    }
  }

  // Met à jour l'affichage de la grille après l'explosion
  afficherGrille();
}
// Fonction pour fixer un Tetrimino dans la grille
function fixerTetrimino(x, y) {
  const forme = currentTetrimino.rotations[rotationIndex];
  for (let i = 0; i < forme.length; i++) {
    for (let j = 0; j < forme[i].length; j++) {
      if (forme[i][j] === 1) {
        const newX = x + j;
        const newY = y + i;
        if (newY >= 0 && newY < nbLignes && newX >= 0 && newX < nbColonnes) {
          grille[newY][newX] = { type: "■", color: currentTetrimino.color }; // Fixe la cellule

          // Si la pièce est "Q", déclenche une explosion
          if (currentTetrimino.color === "black") {
            explosion(newX, newY);
          }
        }
      }
    }
  }
}

// Fonction pour supprimer les lignes complètes
function supprimerLignesCompletes() {
  let lignesSupprimees = 0;

  for (let i = 0; i < nbLignes; i++) {
    if (grille[i].every((cell) => cell.type === "■")) {
      grille.splice(i, 1); // Supprime la ligne complète
      grille.unshift(Array(nbColonnes).fill({ type: " " })); // Ajoute une ligne vide en haut
      lignesSupprimees++;
    }
  }

  if (lignesSupprimees > 0) {
    score += lignesSupprimees * 100; // Ajoute des points
    lignesEliminees += lignesSupprimees;
    niveau = Math.floor(lignesEliminees / 10) + 1; // Augmente le niveau

    console.log("Lignes supprimées :", lignesSupprimees);
    console.log(
      "Score :",
      score,
      "Niveau :",
      niveau,
      "Lignes :",
      lignesEliminees
    );
  }
}

// Fonction pour afficher la grille
function afficherGrille() {
  const gridElement = document.getElementById("grid");
  if (!gridElement) {
    console.error("L'élément avec l'ID 'grid' est introuvable.");
    return;
  }

  gridElement.innerHTML = ""; // Réinitialise l'affichage de la grille
  for (let i = 0; i < nbLignes; i++) {
    for (let j = 0; j < nbColonnes; j++) {
      const cell = grille[i][j];
      const cellElement = document.createElement("div");
      cellElement.style.width = "20px";
      cellElement.style.height = "20px";
      cellElement.style.backgroundColor =
        cell.type === "X" || cell.type === "■" ? cell.color : "#f5f5f5";
      cellElement.style.border = "1px solid #ddd";
      gridElement.appendChild(cellElement);
    }
  }
}

// Fonction pour formater le temps
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
  console.log("Temps formaté :", formattedTime); // Vérification
  return formattedTime;
}

// Fonction pour mettre à jour le score et le temps
function mettreAJourScoreEtTemps() {
  console.log("Appel de mettreAJourScoreEtTemps"); // Vérification

  const scoreElement = document.getElementById("score-value");
  const niveauElement = document.getElementById("niveau-value");
  const lignesElement = document.getElementById("lignes-value");
  const timeElement = document.getElementById("time-value");

  console.log("Éléments HTML :", {
    scoreElement,
    niveauElement,
    lignesElement,
    timeElement,
  });

  if (!scoreElement || !niveauElement || !lignesElement || !timeElement) {
    console.error("Un ou plusieurs éléments HTML sont introuvables !");
    return;
  }

  // Met à jour les valeurs
  scoreElement.textContent = score;
  niveauElement.textContent = niveau;
  lignesElement.textContent = lignesEliminees;

  // Calcule le temps écoulé
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  timeElement.textContent = formatTime(elapsedTime);
}

// Fonction principale de la boucle de jeu
function gameLoop() {
  if (!isPaused) {
    afficherTetrimino(posX, posY, true); // Efface la pièce actuelle

    if (!collision(posX, posY + 1, currentTetrimino.rotations[rotationIndex])) {
      posY++; // Descend la pièce
    } else {
      fixerTetrimino(posX, posY); // Fixe la pièce dans la grille
      supprimerLignesCompletes(); // Supprime les lignes complètes
      posX = Math.floor(nbColonnes / 2) - 1; // Réinitialise la position
      posY = 0;
      rotationIndex = 0;
      currentTetrimino = choisirTetriminoAleatoire(); // Génère une nouvelle pièce

      // Vérifie le game over
      if (collision(posX, posY, currentTetrimino.rotations[rotationIndex])) {
        alert("Game Over ! Score final: " + score);
        return;
      }
    }

    afficherTetrimino(posX, posY); // Dessine la pièce à sa nouvelle position
    afficherGrille(); // Met à jour l'affichage de la grille

    console.log("Appel de mettreAJourScoreEtTemps depuis gameLoop"); // Vérification
    mettreAJourScoreEtTemps(); // Met à jour le score et le temps
  }

  setTimeout(gameLoop, 500); // Répète la boucle de jeu
}

// Gestion des événements clavier
document.addEventListener("keydown", (event) => {
  if (isPaused) return;

  afficherTetrimino(posX, posY, true); // Efface la pièce actuelle avant de la déplacer

  switch (event.key) {
    case "ArrowLeft":
      if (!collision(posX - 1, posY, currentTetrimino.rotations[rotationIndex]))
        posX--;
      break;
    case "ArrowRight":
      if (!collision(posX + 1, posY, currentTetrimino.rotations[rotationIndex]))
        posX++;
      break;
    case "ArrowDown":
      if (!collision(posX, posY + 1, currentTetrimino.rotations[rotationIndex]))
        posY++;
      break;
    case "ArrowUp":
      const nextRotation =
        (rotationIndex + 1) % currentTetrimino.rotations.length;
      if (!collision(posX, posY, currentTetrimino.rotations[nextRotation]))
        rotationIndex = nextRotation;
      break;
    case " ":
      while (
        !collision(posX, posY + 1, currentTetrimino.rotations[rotationIndex])
      ) {
        posY++;
      }
      break;
    case "p":
      isPaused = !isPaused;
      break;
  }

  afficherTetrimino(posX, posY); // Dessine la pièce à sa nouvelle position
  afficherGrille(); // Met à jour l'affichage de la grille
});

// Initialisation du jeu
afficherGrille();
gameLoop();
