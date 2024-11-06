public class TetrisGrid {
    public static void main(String[] args) {
        int nbLignes = 10;
        int nbColonnes = 12;
        char[][] grille = new char[nbLignes][nbColonnes];

        // Remplir la grille avec des espaces
        for (int i = 0; i < nbLignes; i++) {
            for (int j = 0; j < nbColonnes; j++) {
                grille[i][j] = ' ';
            }
        }

        // Dessiner les bords avec '#'
        for (int i = 0; i < nbLignes; i++) {
            grille[i][0] = '#'; // Bord gauche
            grille[i][nbColonnes - 1] = '#'; // Bord droit
        }
        for (int j = 0; j < nbColonnes; j++) {
            grille[0][j] = '#'; // Bord du haut
            grille[nbLignes - 1][j] = '#'; // Bord du bas
        }

        // Afficher la grille
        for (int i = 0; i < nbLignes; i++) {
            for (int j = 0; j < nbColonnes; j++) {
                System.out.print(grille[i][j] + " ");
            }
            System.out.println();
        }
    }
}
