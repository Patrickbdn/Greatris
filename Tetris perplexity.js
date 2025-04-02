// Définition des formes des Tetriminos avec couleurs
const tetriminos = {
  I: {
    rotations: [
      [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
      [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]
    ],
    color: "cyan"
  },
  O: {
    rotations: [[[1, 1], [1, 1]]],
    color: "yellow"
  },
  T: {
    rotations: [
      [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
      [[0, 1, 0], [0, 1, 1], [0, 1, 0]],
      [[0, 0, 0], [1, 1, 1], [0, 1, 0]],
      [[0, 1, 0], [1, 1, 0], [0, 1, 0]]
    ],
    color: "purple"
  },
  L: {
    rotations: [
      [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
      [[0, 1, 0], [0, 1, 0], [0, 1, 1]],
      [[0, 0, 0], [1, 1, 1], [1, 0, 0]],
      [[1, 1, 0], [0, 1, 0], [0, 1, 0]]
    ],
    color: "orange"
  },
  J: {
    rotations: [
      [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
      [[0, 1, 1], [0, 1, 0], [0, 1, 0]],
      [[0, 0, 0], [1, 1, 1], [0, 0, 1]],
      [[0, 1, 0], [0, 1, 0], [1, 1, 0]]
    ],
    color: "blue"
  },
  S: {
    rotations: [
      [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
      [[0, 1, 0], [0, 1, 1], [0, 0, 1]]
    ],
    color: "green"
  },
  Z: {
    rotations: [
      [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
      [[0, 0, 1], [0, 1, 1], [0, 1, 0]]
    ],
    color: "red"
  }
};

// Initialisation de la grille et des variables
const nbLignes = 20;
const nbColonnes = 10;
let grille = Array.from({ length: nbLignes }, () => Array(nbColonnes).fill({ type: " " }));
let posX = Math.floor(nbColonnes / 2) - 1;
let posY = 0;
let rotationIndex = 0;
let currentTetriminoType = "";
let currentTetrimino = choisirTetriminoAleatoire();
let score = 0;
let niveau = 1;
let lignesEliminees = 0;

function choisirTetriminoAleatoire() {
  const formesDisponibles = Object.keys(tetriminos);
  currentTetriminoType = formesDisponibles[Math.floor(Math.random() * formesDisponibles.length)];
  return tetriminos[currentTetriminoType];
}

function afficherGrille() {
  const gridElement = document.getElementById("grid");
  gridElement.innerHTML = "";
  gridElement.style.display = "grid";
  gridElement.style.gridTemplateColumns = `repeat(${nbColonnes}, 20px)`;
  gridElement.style.gridTemplateRows = `repeat(${nbLignes}, 20px)`;
  gridElement.style.gap = "1px";
  gridElement.style.backgroundColor = "#333";
  gridElement.style.padding = "10px";
  gridElement.style.borderRadius = "5px";

  for (let i = 0; i < nbLignes; i++) {
    for (let j = 0; j < nbColonnes; j++) {
      const cell = document.createElement("div");
      cell.style.width = "20px";
      cell.style.height = "20px";
      cell.style.backgroundColor = grille[i][j].type !== " " ? grille[i][j].color : "#111";
      gridElement.appendChild(cell);
    }
  }

  document.getElementById("score").textContent = score;
  document.getElementById("niveau").textContent = niveau;
  document.getElementById("lignes").textContent = lignesEliminees;
}

function collision(x, y, forme) {
  for (let i = 0; i < forme.length; i++) {
    for (let j = 0; j < forme[i].length; j++) {
      if (forme[i][j] === 1) {
        let newX = x + j;
        let newY = y + i;
        if (newX < 0 || newX >= nbColonnes || newY >= nbLignes || (newY >= 0 && grille[newY][newX].type === "■")) {
          return true;
        }
      }
    }
  }
  return false;
}

function afficherTetrimino(x, y, effacer = false) {
  const forme = currentTetrimino.rotations[rotationIndex];
  for (let i = 0; i < forme.length; i++) {
    for (let j = 0; j < forme[i].length; j++) {
      if (forme[i][j] === 1) {
        if (y + i >= 0 && y + i < nbLignes && x + j >= 0 && x + j < nbColonnes) {
          grille[y + i][x + j] = effacer ? { type: " " } : { type: "■", color: currentTetrimino.color };
        }
      }
    }
  }
}

function fixerTetrimino(x, y) {
  const forme = currentTetrimino.rotations[rotationIndex];
  for (let i = 0; i < forme.length; i++) {
    for (let j = 0; j < forme[i].length; j++) {
      if (forme[i][j] === 1 && y + i >= 0) {
        grille[y + i][x + j] = { type: "■", color: currentTetrimino.color };
      }
    }
  }
  nettoyerLignes();
}

function nettoyerLignes() {
  let lignesNettoyees = 0;
  for (let i = nbLignes - 1; i >= 0; i--) {
    if (grille[i].every(cell => cell.type === "■")) {
      grille.splice(i, 1);
      grille.unshift(Array(nbColonnes).fill({ type: " " }));
      lignesNettoyees++;
    }
  }
  if (lignesNettoyees > 0) {
    score += [0, 40, 100, 300, 1200][lignesNettoyees] * niveau;
    lignesEliminees += lignesNettoyees;
    niveau = Math.floor(lignesEliminees / 10) + 1;
  }
}

function evaluerPosition(grilleTest) {
  let hauteurTotale = 0;
  let trous = 0;
  let lignesCompletes = 0;

  for (let col = 0; col < nbColonnes; col++) {
    let colonne = grilleTest.map(row => row[col].type);
    let hauteur = nbLignes - colonne.lastIndexOf("■") - 1;
    hauteurTotale += hauteur;

    for (let row = nbLignes - hauteur; row < nbLignes; row++) {
      if (grilleTest[row][col].type === " ") {
        trous++;
      }
    }
  }

  for (let row = 0; row < nbLignes; row++) {
    if (grilleTest[row].every(cell => cell.type === "■")) {
      lignesCompletes++;
    }
  }

  return -(hauteurTotale * 0.51 + trous * 0.35 - lignesCompletes * 0.76);
}

function trouverMeilleurePosition() {
  let meilleurePosition = { x: 0, rotation: 0, score: -Infinity };

  for (let rotation = 0; rotation < currentTetrimino.rotations.length; rotation++) {
    for (let x = 0; x < nbColonnes; x++) {
      let y = 0;
      let grilleTest = JSON.parse(JSON.stringify(grille));

      while (!collision(x, y + 1, currentTetrimino.rotations[rotation])) {
        y++;
      }

      const forme = currentTetrimino.rotations[rotation];
      for (let i = 0; i < forme.length; i++) {
        for (let j = 0; j < forme[i].length; j++) {
          if (forme[i][j] === 1 && y + i >= 0 && y + i < nbLignes && x + j >= 0 && x + j < nbColonnes) {
            grilleTest[y + i][x + j] = { type: "■", color: currentTetrimino.color };
          }
        }
      }

      let score = evaluerPosition(grilleTest);
      if (score > meilleurePosition.score) {
        meilleurePosition = { x, rotation, score };
      }
    }
  }

  return meilleurePosition;
}

function afficherSuggestionIA() {
  const meilleurCoup = trouverMeilleurePosition();
  const forme = currentTetrimino.rotations[meilleurCoup.rotation];
  let y = 0;
  while (!collision(meilleurCoup.x, y + 1, forme)) {
    y++;
  }

  for (let i = 0; i < forme.length; i++) {
    for (let j = 0; j < forme[i].length; j++) {
      if (forme[i][j] === 1 && y + i >= 0 && y + i < nbLignes && meilleurCoup.x + j >= 0 && meilleurCoup.x + j < nbColonnes) {
        if (grille[y + i][meilleurCoup.x + j].type === " ") {
          grille[y + i][meilleurCoup.x + j] = { type: "O", color: "rgba(255, 255, 255, 0.2)" };
        }
      }
    }
  }
}

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

    if (collision(posX, posY, currentTetrimino.rotations[rotationIndex])) {
      alert("Game Over! Score final: " + score);
      return;
    }
  }

  afficherTetrimino(posX, posY);
  afficherSuggestionIA();
  afficherGrille();

  const vitesse = Math.max(100, 500 - (niveau - 1) * 50);
  setTimeout(gameLoop, vitesse);
}

document.addEventListener("keydown", function(event) {
  afficherTetrimino(posX, posY, true);

  if (event.key === "ArrowLeft" && !collision(posX - 1, posY, currentTetrimino.rotations[rotationIndex])) {
    posX--;
  } else if (event.key === "ArrowRight" && !collision(posX + 1, posY, currentTetrimino.rotations[rotationIndex])) {
    posX++;
  } else if (event.key === "ArrowDown" && !collision(posX, posY + 1, currentTetrimino.rotations[rotationIndex])) {
    posY++;
    score += 1;
  } else if (event.key === "ArrowUp") {
    const nextRotation = (rotationIndex + 1) % currentTetrimino.rotations.length;
    if (!collision(posX, posY, currentTetrimino.rotations[nextRotation])) {
      rotationIndex = nextRotation;
    }
  } else if (event.key === " ") {
    while (!collision(posX, posY + 1, currentTetrimino.rotations[rotationIndex])) {
      posY++;
      score += 2;
    }
  }

  afficherTetrimino(posX, posY);
  afficherSuggestionIA();
  afficherGrille();
});

window.onload = function() {
  const gameContainer = document.createElement("div");
  gameContainer.id = "game-container";
  gameContainer.style.display = "flex";
  gameContainer.style.justifyContent = "center";
  gameContainer.style.alignItems = "center";
  gameContainer.style.height = "100vh";
  gameContainer.style.backgroundColor = "#222";
  document.body.appendChild(gameContainer);

  const gameArea = document.createElement("div");
  gameArea.style.display = "flex";
  gameArea.style.flexDirection = "row";
  gameArea.style.gap = "20px";
  gameContainer.appendChild(gameArea);

  const gridElement = document.createElement("div");
  gridElement.id = "grid";
  gameArea.appendChild(gridElement);

  const infoSection = document.createElement("div");
  infoSection.style.color = "#fff";
  infoSection.style.fontFamily = "Arial, sans-serif";
  infoSection.innerHTML = `
    <h2>TETRIS</h2>
    <p>Score: <span id="score">0</span></p>
    <p>Niveau: <span id="niveau">1</span></p>
    <p>Lignes: <span id="lignes">0</span></p>
    <h3>Contrôles</h3>
    <ul>
      <li>← → : Déplacer</li>
      <li>↑ : Rotation
