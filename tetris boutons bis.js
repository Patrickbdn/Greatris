let isGamePaused = false;
let isGameStopped = false;

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

// Variables pour le score
let score = 0;
let niveau = 1;
let lignesEliminees = 0;

// Nouveaux états de jeu
let isGamePaused = false;
let isGameStopped = false;
let gameLoopTimeout = null;

// Fonction pour choisir un Tetrimino aléatoire
function choisirTetriminoAleatoire() {
  const formesDisponibles = Object.keys(tetriminos);
  currentTetriminoType =
    formesDisponibles[Math.floor(Math.random() * formesDisponibles.length)];
  return tetriminos[currentTetriminoType];
}

// Fonction pour afficher la grille dans le HTML
function afficherGrille() {
  const gridElement = document.getElementById("grid");

  // Style pour la grille
  gridElement.style.display = "grid";
  gridElement.style.gridTemplateColumns = `repeat(${nbColonnes}, 20px)`;
  gridElement.style.gridTemplateRows = `repeat(${nbLignes}, 20px)`;
  gridElement.style.gridGap = "1px";
  gridElement.style.backgroundColor = "#e0e0e0"; // Fond de grille plus clair
  gridElement.style.border = "2px solid #333";
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
        cellElement.style.backgroundColor = "#f5f5f5"; // Cellules vides plus claires
        cellElement.style.border = "1px solid #e0e0e0"; // Bordure légère pour les cellules
      }

      gridElement.appendChild(cellElement);
    }
  }

  // Mettre à jour l'affichage du score
  document.getElementById("score-value").textContent = score;
  document.getElementById("niveau-value").textContent = niveau;
  document.getElementById("lignes-value").textContent = lignesEliminees;
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
        grille[ghostY + i][x + j] = {
          type: "O",
          color: currentTetrimino.color,
        }; // Représente le fantôme
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
  let lignesNettoyees = 0;

  for (let i = 0; i < nbLignes; i++) {
    if (grille[i].every((cell) => cell.type === "■")) {
      grille.splice(i, 1);
      grille.unshift(Array(nbColonnes).fill({ type: " " }));
      lignesNettoyees++;
    }
  }

  // Mise à jour du score si des lignes ont été nettoyées
  if (lignesNettoyees > 0) {
    // Calcul du score basé sur le nombre de lignes et le niveau actuel
    // Système de points classique de Tetris
    const points = [0, 100, 300, 500, 800]; // 0, 1, 2, 3, ou 4 lignes
    score += points[lignesNettoyees] * niveau;

    // Mise à jour du compteur de lignes
    lignesEliminees += lignesNettoyees;

    // Mise à jour du niveau (chaque 10 lignes)
    niveau = Math.floor(lignesEliminees / 10) + 1;
  }
}

// Gestion des touches
document.addEventListener("keydown", function (event) {
  // Ignore les touches si le jeu est en pause ou arrêté
  if (isGamePaused || isGameStopped) return;

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
    // Ajout de points pour le soft drop (descente manuelle)
    score += 1;
  } else if (event.key === "ArrowUp") {
    const nextRotation =
      (rotationIndex + 1) % currentTetrimino.rotations.length;
    if (!collision(posX, posY, currentTetrimino.rotations[nextRotation])) {
      rotationIndex = nextRotation;
    }
  } else if (event.key === " ") {
    // Espace pour hard drop
    let dropDistance = 0;
    while (
      !collision(posX, posY + 1, currentTetrimino.rotations[rotationIndex])
    ) {
      posY++;
      dropDistance++;
    }
    // Ajout de points pour le hard drop (2 points par cellule)
    score += dropDistance * 2;
  }

  afficherTetrimino(posX, posY);
  afficherGrille();
});

// Fonction de pause
function togglePause() {
  isGamePaused = !isGamePaused;
  const pauseButton = document.getElementById("pause-button");

  if (isGamePaused) {
    pauseButton.textContent = "Reprendre";
    clearTimeout(gameLoopTimeout);
  } else {
    pauseButton.textContent = "Pause";
    gameLoop();
  }
}

// Fonction de stop
function stopGame() {
  isGameStopped = true;
  clearTimeout(gameLoopTimeout);
  alert(`Jeu arrêté. Score final: ${score}`);
}

// Fonction de restart
function restartGame() {
  // Réinitialiser toutes les variables
  grille = Array.from({ length: nbLignes }, () =>
    Array(nbColonnes).fill({ type: " " })
  );
  posX = Math.floor(nbColonnes / 2) - 1;
  posY = 0;
  rotationIndex = 0;
  currentTetriminoType = "";
  currentTetrimino = choisirTetriminoAleatoire();

  // Réinitialiser les scores
  score = 0;
  niveau = 1;
  lignesEliminees = 0;

  // Réinitialiser les états du jeu
  isGamePaused = false;
  isGameStopped = false;

  // Réinitialiser le bouton pause
  const pauseButton = document.getElementById("pause-button");
  pauseButton.textContent = "Pause";

  // Réafficher la grille et relancer le jeu
  afficherGrille();
  gameLoop();
}

// Boucle de jeu
function gameLoop() {
  // Arrêter si le jeu est en pause ou arrêté
  if (isGamePaused || isGameStopped) return;

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
      isGameStopped = true;
      alert("Game Over ! Score final: " + score);
      return;
    }
  }

  afficherTetrimino(posX, posY);
  afficherGrille();

  // Ajustement de la vitesse en fonction du niveau
  const vitesse = Math.max(100, 500 - (niveau - 1) * 50);
  gameLoopTimeout = setTimeout(gameLoop, vitesse);
}

// Initialisation de la page HTML
window.onload = function () {
  // Créer le conteneur principal
  const gameContainer = document.createElement("div");
  gameContainer.id = "game-container";
  gameContainer.style.display = "flex";
  gameContainer.style.flexDirection = "row";
  gameContainer.style.justifyContent = "center";
  gameContainer.style.gap = "20px";
  document.body.appendChild(gameContainer);

  // Créer la div du jeu
  const gridElement = document.createElement("div");
  gridElement.id = "grid";
  gameContainer.appendChild(gridElement);

  // Créer la section d'informations
  const infoSection = document.createElement("div");
  infoSection.id = "info-section";
  infoSection.style.display = "flex";
  infoSection.style.flexDirection = "column";
  infoSection.style.justifyContent = "flex-start";
  infoSection.style.alignItems = "flex-start";
  infoSection.style.padding = "15px";
  infoSection.style.backgroundColor = "#f0f0f0";
  infoSection.style.color = "#333";
  infoSection.style.fontFamily = "Arial, sans-serif";
  infoSection.style.borderRadius = "5px";
  infoSection.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";
  gameContainer.appendChild(infoSection);

  // Ajouter les éléments d'information
  const titleElement = document.createElement("h2");
  titleElement.textContent = "TETRIS";
  titleElement.style.margin = "0 0 20px 0";
  titleElement.style.color = "#2a6";
  infoSection.appendChild(titleElement);

  // Score
  const scoreDiv = document.createElement("div");
  scoreDiv.style.marginBottom = "10px";
  const scoreLabel = document.createElement("span");
  scoreLabel.textContent = "Score: ";
  scoreDiv.appendChild(scoreLabel);
  const scoreValue = document.createElement("span");
  scoreValue.id = "score-value";
  scoreValue.textContent = "0";
  scoreValue.style.fontWeight = "bold";
  scoreDiv.appendChild(scoreValue);
  infoSection.appendChild(scoreDiv);

  // Niveau
  const niveauDiv = document.createElement("div");
  niveauDiv.style.marginBottom = "10px";
  const niveauLabel = document.createElement("span");
  niveauLabel.textContent = "Niveau: ";
  niveauDiv.appendChild(niveauLabel);
  const niveauValue = document.createElement("span");
  niveauValue.id = "niveau-value";
  niveauValue.textContent = "1";
  niveauValue.style.fontWeight = "bold";
  niveauDiv.appendChild(niveauValue);
  infoSection.appendChild(niveauDiv);

  // Lignes
  const lignesDiv = document.createElement("div");
  lignesDiv.style.marginBottom = "10px";
  const lignesLabel = document.createElement("span");
  lignesLabel.textContent = "Lignes: ";
  lignesDiv.appendChild(lignesLabel);
  const lignesValue = document.createElement("span");
  lignesValue.id = "lignes-value";
  lignesValue.textContent = "0";
  lignesValue.style.fontWeight = "bold";
  lignesDiv.appendChild(lignesValue);
  infoSection.appendChild(lignesDiv);

  // Contrôles
  const controlsTitle = document.createElement("h3");
  controlsTitle.textContent = "Contrôles";
  controlsTitle.style.marginTop = "20px";
  controlsTitle.style.marginBottom = "10px";
  infoSection.appendChild(controlsTitle);

  const controlsList = document.createElement("ul");
  controlsList.style.padding = "0 0 0 20px";
  controlsList.style.margin = "0";

  const controls = [
    "← → : Déplacer",
    "↑ : Rotation",
    "↓ : Descente",
    "Espace : Chute rapide",
  ];

  controls.forEach((control) => {
    const item = document.createElement("li");
    item.textContent = control;
    item.style.marginBottom = "5px";
    controlsList.appendChild(item);
  });

  infoSection.appendChild(controlsList);

  // Boutons de contrôle du jeu
  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.gap = "10px";
  buttonContainer.style.marginTop = "20px";

  // Bouton Pause
  const pauseButton = document.createElement("button");
  pauseButton.id = "pause-button";
  pauseButton.textContent = "Pause";
  pauseButton.style.padding = "10px 15px";
  pauseButton.style.backgroundColor = "#4CAF50";
  pauseButton.style.color = "white";
  pauseButton.style.border = "none";
  pauseButton.style.borderRadius = "5px";
  pauseButton.style.cursor = "pointer";
  pauseButton.addEventListener("click", togglePause);
  buttonContainer.appendChild(pauseButton);

  // Bouton Stop
  const stopButton = document.createElement("button");
  stopButton.textContent = "Stop";
  stopButton.style.padding = "10px 15px";
  stopButton.style.backgroundColor = "#f44336";
  stopButton.style.color = "white";
  stopButton.style.border = "none";
  stopButton.style.borderRadius = "5px";
  stopButton.style.cursor = "pointer";
  stopButton.addEventListener("click", stopGame);
  buttonContainer.appendChild(stopButton);

  // Bouton Restart
  const restartButton = document.createElement("button");
  restartButton.textContent = "Restart";
  restartButton.style.padding = "10px 15px";
  restartButton.style.backgroundColor = "#2196F3";
  restartButton.style.color = "white";
  restartButton.style.border = "none";
  restartButton.style.borderRadius = "5px";
  restartButton.style.cursor = "pointer";
  restartButton.addEventListener("click", restartGame);
  buttonContainer.appendChild(restartButton);

  infoSection.appendChild(buttonContainer);

  // Style du body et du conteneur
  document.body.style.backgroundColor = "#e9e9e9"; // Fond global plus clair
  document.body.style.display = "flex";
  document.body.style.justifyContent = "center";
  document.body.style.alignItems = "center";
  document.body.style.height = "100vh";
  document.body.style.margin = "0";

  // Lancer le jeu
  afficherGrille();
  gameLoop();
};
// Ajoutez ces écouteurs d'événements à la fin de votre script
document.addEventListener("DOMContentLoaded", () => {
  // Bouton Pause
  const pauseButton = document.getElementById("pause-button");
  pauseButton.addEventListener("click", togglePause);

  // Bouton Stop
  const stopButton = document.getElementById("stop-button");
  stopButton.addEventListener("click", stopGame);

  // Bouton Restart
  const restartButton = document.getElementById("restart-button");
  restartButton.addEventListener("click", restartGame);
});

// Fonction pour mettre en pause/reprendre le jeu
function togglePause() {
  isGamePaused = !isGamePaused;
  const pauseButton = document.getElementById("pause-button");

  if (isGamePaused) {
    pauseButton.textContent = "Reprendre";
    // Mettez en pause votre boucle de jeu ici
    // Par exemple, si vous utilisez un setTimeout, vous pouvez le stopper
  } else {
    pauseButton.textContent = "Pause";
    // Reprenez votre boucle de jeu ici
  }
}

// Fonction pour arrêter le jeu
function stopGame() {
  isGameStopped = true;
  // Arrêtez complètement le jeu
  // Par exemple, arrêtez le timer, désactivez les contrôles
  alert(`Jeu arrêté. Score final : ${score}`);
}

// Fonction pour redémarrer le jeu
function restartGame() {
  // Réinitialisez toutes vos variables de jeu
  score = 0;
  niveau = 1;
  // Réinitialisez la grille
  // Recommencez une nouvelle partie

  // Mettez à jour l'affichage
  document.getElementById("score-value").textContent = score;
  document.getElementById("niveau-value").textContent = niveau;

  // Réinitialisez l'état du jeu
  isGamePaused = false;
  isGameStopped = false;

  // Recommencez le jeu
  // Appelez votre fonction qui initialise/recommence le jeu
}
