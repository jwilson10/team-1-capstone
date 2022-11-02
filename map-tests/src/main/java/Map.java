public class Map {

    public static void main(String[] args) {
        String[][] map = generateMap();
        for(int i = 0; i < map.length; i++){
            for (int j = 0; j < map[i].length; j++) {
                System.out.print(map[i][j]);
            }
            System.out.print("\n");
        }
    }

    public static String[][] generateMap(){
        String[][] mapArr = new String[10][20];
        for (int i = 0; i < 10; i++) {
            for (int j = 0; j < 20; j++) {
                if(i == 0 || i == 9 || j == 0 || j == 19){
                    mapArr[i][j] = "#";
                } else{
                    mapArr[i][j] = ".";
                }
            }
        }
        return mapArr;
    }

    public static int generateSpot(){
        return 0;
    }

}
