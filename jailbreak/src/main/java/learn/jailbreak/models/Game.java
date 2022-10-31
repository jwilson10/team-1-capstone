package learn.jailbreak.models;

import javax.persistence.*;
import java.util.List;

@Entity
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int gameId;
    @Column(name="user_id")
    private int userId;
    private String characterName;
    private int gameNumber;

    @OneToMany(orphanRemoval = true)
    @JoinColumn(name="game_id", insertable = false, updatable = false, nullable = false)
    private List<InventorySlot> inventorySlotList;

    @OneToMany(orphanRemoval = true)
    @JoinColumn(name="game_id", insertable = false, updatable = false, nullable = false)
    private List<GameEvent> eventsList;

    public List<InventorySlot> getInventorySlotList() {
        return inventorySlotList;
    }

    public void setInventorySlotList(List<InventorySlot> inventorySlotList) {
        this.inventorySlotList = inventorySlotList;
    }

    public int getGameId() {
        return gameId;
    }

    public void setGameId(int gameId) {
        this.gameId = gameId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getCharacterName() {
        return characterName;
    }

    public void setCharacterName(String characterName) {
        this.characterName = characterName;
    }

    public int getGameNumber() {
        return gameNumber;
    }

    public void setGameNumber(int gameNumber) {
        this.gameNumber = gameNumber;
    }

    public List<GameEvent> getEventsList() {
        return eventsList;
    }

    public void setEventsList(List<GameEvent> eventsList) {
        this.eventsList = eventsList;
    }
}
