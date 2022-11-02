public class Cat implements GameObject{

    private int x;
    private int y;
    private boolean isAlive = true;
    private final char mapPiece = 'M';

    public Cat() {
    }

    public Cat(int x, int y, boolean isAlive) {
        this.x = x;
        this.y = y;
        this.isAlive = isAlive;
    }

    public char getMapPiece() {
        return mapPiece;
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

    public boolean isAlive() {
        return isAlive;
    }

    public void setAlive(boolean alive) {
        isAlive = alive;
    }
}
