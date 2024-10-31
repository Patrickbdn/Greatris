public class Grille_imperat {
    public static StringBuilder[] initGrille(String g[]) {
        StringBuilder[] grille = new StringBuilder[12];
        for (int i = 0; i < g.length; i++) 
            grille[i] = new StringBuilder(g[i]);
        return grille;
    }

    public static void remplacerCar(StringBuilder grille[], int y, int x, char c) {
        grille[y].setCharAt(x, c);
    }
    
    public static void affiche(StringBuilder grille[]) {
        for (int i=0; i<grille.length; i++)
            System.out.println(grille[i]);    
    }

    public static Boolean comparer(StringBuilder g1[], StringBuilder g2[]) {
        for (int i=0; i<g1.length; i++)
            if ((g1[i]).compareTo(g2[i])!=0) return false;
        return true;
    }
    public static void main(String[] args) {
        final String grille0[] = {
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

        StringBuilder grille[] = new StringBuilder[12];
        grille = initGrille(grille0);
        affiche(grille);
        remplacerCar(grille, 3,4,'#');
        affiche(grille);
        grille = initGrille(grille0);
        affiche(grille);
    
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

    remplacerCar(grille,4,7,'#');
    remplacerCar(grille,5,11,'#');
    affiche(grille);
    StringBuilder g2[] = new StringBuilder[12];
    g2 = initGrille(grilleTest);
    Boolean eq = comparer(grille, g2);
    System.out.println(eq);    
    }
}
