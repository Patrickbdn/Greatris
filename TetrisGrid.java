
    public class TetrisGrid {
        private int[][] grid;
        private int rows;
        private int cols;
    
        public TetrisGrid(int rows, int cols) {
            this.rows = rows;
            this.cols = cols;
            grid = new int[rows][cols]; // Initialisation de la grille avec des zéros
        }
    
        public void displayGrid() {
            for (int i = 0; i < rows; i++) {
                for (int j = 0; j < cols; j++) {
                    System.out.print(grid[i][j] + " ");
                }
                System.out.println();
            }
        }
    
        public void setCell(int row, int col, int value) {
            if (row >= 0 && row < rows && col >= 0 && col < cols) {
                grid[row][col] = value;
            }
        }
    
        public static void main(String[] args) {
            TetrisGrid tetrisGrid = new TetrisGrid(10, 12); // Crée une grille de 20 lignes par 10 colonnes
            tetrisGrid.displayGrid(); // Affiche la grille vide
    
            // Exemple : placer une pièce (valeur 1) dans la grille
            tetrisGrid.setCell(0, 4, 1); // Place une case occupée au sommet, au centre
            
            System.out.println("Après ajout d'une pièce :");
            tetrisGrid.displayGrid(); // Affiche la grille après ajout de la pièce
        }
    }
    
    

