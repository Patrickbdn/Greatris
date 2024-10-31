package pat.tetris; // La déclaration du package doit être en haut du fichier

import javax.swing.JFrame; // Les imports doivent venir après le package

public class Tetris extends JFrame { // Une seule déclaration de classe publique
    
    public Tetris() {
        initUI();
    }
    
    private void initUI() {
        add(new Board()); // Assure-toi que la classe Board existe
        setTitle("Tetris");
        setSize(200, 400);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
    }
    
    public static void main(String[] args) {
        Tetris game = new Tetris();
        game.setVisible(true);
    }
}
