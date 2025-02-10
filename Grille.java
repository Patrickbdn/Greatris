/**
 * The Grille class in Java represents a grid structure with methods for initializing, modifying,
 * displaying, and comparing grids.
 */

/* c'est la classe */

public class Grille {    
    public StringBuilder grille[];

    public Grille() {
       initGrille(grille0);
    }

    public Grille(String uneGrille[]) {
        initGrille(uneGrille);
     }

    public String grille0[] = {
     "+---------------+",
     "|               |",
     "|               |",
     "|               |",
     "|               |",
     "|               |",
     "|               |",
     "|               |",
     "|               |",
     "|               |",
     "|               |",
     "+---------------+"
     };

    
    public void initGrille(String g[]) {
        grille = new StringBuilder[12];
        for (int i = 0; i < g.length; i++) 
            grille[i] = new StringBuilder(g[i]);
    }

    public void reinitGrille() {
        initGrille(grille0);
    }

    public void remplacerCar(int y, int x, char c) {
        grille[y].setCharAt(x, c);
    }
    
    public void affiche() {
        for (int i=0; i<grille.length; i++)
            System.out.println(grille[i]);    
    }

    public Boolean comparer(Grille g2) {
        for (int i=0; i<grille.length; i++)
            if ((grille[i]).compareTo(g2.grille[i])!=0) return false;
        return true;
    }
   
    public static void main(String[] args) {
        Grille g = new Grille();
        g.affiche();
        g.remplacerCar(3,4,'#');
        g.affiche();
        g.reinitGrille();
        g.affiche();
    
        String grilleTest[] = {
            "+---------------+",
            "|               |",
            "|               |",
            "|               |",
            "|      #        |",
            "|          #    |",
            "|               |",
            "|               |",
            "|               |",
            "|               |",
            "|               |",
            "+---------------+"
            };

    Grille g2= new Grille(grilleTest);
    g.remplacerCar(4,7,'#');
    g.remplacerCar(5,11,'#');
    g.affiche();
    Boolean eq = g.comparer(g2);
    System.out.println(eq);    
    }
}
