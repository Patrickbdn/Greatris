public class Shape {
    package pat.tetris;

public class Shape {

    public enum Tetrominoe { NoShape, ZShape, SShape, LineShape, TShape, SquareShape, LShape, MirroredLShape }

    private Tetrominoe pieceShape;
    private int[][] coords;
    
private void setCoordinates(Tetrominoe shape) {
    switch (shape) {
        case ZShape:
            coords = new int[][] { {0, -1}, {0, 0}, {1, 0}, {1, 1} };
            break;
        // Définir les autres formes...
    }
}

    public Shape() {
        coords = new int[4][2];
        setShape(Tetrominoe.NoShape);
    }

    public void setShape(Tetrominoe shape) {
        // Définir les coordonnées de la forme en fonction du type de pièce
    }
    
    public void setRandomShape() {
        // Sélectionner une forme aléatoire
    }
    
    public int getX(int index) { return coords[index][0]; }
    public int getY(int index) { return coords[index][1]; }
    public Tetrominoe getShape() { return pieceShape; }
}

}
