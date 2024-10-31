import javax.swing.*;
import java.awt.*;

 

public class TetrisHomePage extends JFrame {
    private JButton loginButton;
    private JButton createAccountButton;

    public TetrisHomePage() {
        // Titre de la fenêtre
        setTitle("Accueil - Jeu Tetris");

        // Configurer la fenêtre
        setSize(400, 300);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null); // Centrer la fenêtre sur l'écran

        // Créer le panel principal
        JPanel panel = new JPanel();
        panel.setLayout(new BorderLayout());

        // Créer le titre du jeu
       
        JLabel titleLabel = new JLabel("Bienvenue sur Greatris", SwingConstants.CENTER);
        titleLabel.setFont(new Font("Arial", Font.BOLD, 24));
        titleLabel.setBorder(BorderFactory.createEmptyBorder(20, 0, 20, 0));

        // Créer un panel pour les boutons
        JPanel buttonPanel = new JPanel();
        buttonPanel.setLayout(new GridLayout(1, 2, 10, 0)); // 1 ligne, 2 colonnes

        // Bouton Se connecter
        loginButton = new JButton("Se connecter");
        buttonPanel.add(loginButton);
        // Bouton Invité
        loginButton = new JButton("Invité");
        buttonPanel.add(loginButton);
        // Bouton Création de compte
        createAccountButton = new JButton("Création de compte");
        buttonPanel.add(createAccountButton);

        // Ajouter les composants au panel principal
        panel.add(titleLabel, BorderLayout.NORTH);
        panel.add(buttonPanel, BorderLayout.CENTER);

        // Ajouter le panel principal à la fenêtre
        add(panel);
    }

    public static void main(String[] args) {
        // Créer et afficher la page d'accueil
        SwingUtilities.invokeLater(() -> {
            TetrisHomePage homePage = new TetrisHomePage();
            homePage.setVisible(true);
        });
    }
}
