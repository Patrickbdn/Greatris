import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

public class TetrisGame extends JFrame implements KeyListener {
    private int nbLignes = 10;
    private int nbColonnes = 12;
    private char[][] grille = new char[nbLignes][nbColonnes];
    private int posX = 1; // Position de départ du bloc en X (colonne)
    private int posY = nbLignes - 2; // Position de départ du bloc en bas de la grille

    public TetrisGame() {
        // Initialisation de la fenêtre
        setTitle("Tetris avec Timer");
        setSize(300, 400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        addKeyListener(this);

        // Initialiser la grille avec les bords et l'espace intérieur
        initialiserGrille();
        afficherGrille();

        // Créer un Timer pour déplacer automatiquement le bloc vers le haut
        Timer timer = new Timer(1000, new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                deplacerBlocAuto();
            }
        });
        timer.start();
    }

    private void initialiserGrille() {
        for (int i = 0; i < nbLignes; i++) {
            for (int j = 0; j < nbColonnes; j++) {
                if (i == 0 || i == nbLignes - 1 || j == 0 || j == nbColonnes - 1) {
                    grille[i][j] = '#'; // Bords
                } else {
                    grille[i][j] = ' '; // Intérieur vide
                }
            }
        }
        grille[posY][posX] = 'O'; // Position initiale du bloc
    }

    private void afficherGrille() {
        // Effacer l'écran
        System.out.print("\033[H\033[2J");
        System.out.flush();

        // Afficher la grille
        for (int i = 0; i < nbLignes; i++) {
            for (int j = 0; j < nbColonnes; j++) {
                System.out.print(grille[i][j] + " ");
            }
            System.out.println();
        }
    }

    private void deplacerBloc(int newPosX, int newPosY) {
        // Vérifier si la nouvelle position est à l'intérieur des bords
        if (newPosX > 0 && newPosX < nbColonnes - 1 && newPosY > 0 && newPosY < nbLignes - 1) {
            // Enlever le bloc de sa position actuelle
            grille[posY][posX] = ' ';
            // Mettre à jour la position
            posX = newPosX;
            posY = newPosY;
            // Placer le bloc à la nouvelle position
            grille[posY][posX] = 'O';
            afficherGrille();
        }
    }

    private void deplacerBlocAuto() {
        // Effacer la position actuelle du bloc
        grille[posY][posX] = ' ';

        // Monter le bloc d'une ligne vers le haut
        posY--;

        // Si le bloc atteint le haut, le remettre en bas
        if (posY <= 0) {
            posY = nbLignes - 2;
        }

        // Placer le bloc à la nouvelle position
        grille[posY][posX] = 'O';
        afficherGrille();
    }

    @Override
    public void keyPressed(KeyEvent e) {
        int keyCode = e.getKeyCode();
        switch (keyCode) {
            case KeyEvent.VK_UP:
                deplacerBloc(posX, posY - 1);
                break;
            case KeyEvent.VK_DOWN:
                deplacerBloc(posX, posY + 1);
                break;
            case KeyEvent.VK_LEFT:
                deplacerBloc(posX - 1, posY);
                break;
            case KeyEvent.VK_RIGHT:
                deplacerBloc(posX + 1, posY);
                break;
        }
    }

    @Override
    public void keyReleased(KeyEvent e) {
        // Ne fait rien ici
    }

    @Override
    public void keyTyped(KeyEvent e) {
        // Ne fait rien ici
    }

    public static void main(String[] args) {
        TetrisGame jeu = new TetrisGame();
        jeu.setVisible(true);
    }
}
