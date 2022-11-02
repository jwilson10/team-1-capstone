public class Player implements GameObject{

    private int x;
    private int y;
    private final char mapPiece = '@';

    public Player() {
    }

    public Player(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public char getMapPiece() {
        return mapPiece;
    }
}