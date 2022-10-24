package learn.jailbreak.models;

import javax.persistence.*;

@Entity
public class InventorySlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int slotId;

    @Column(name="game_id")
    private int gameId;

    @Column(name="resource_id")
    private int resourceId;
    private int quantity;


    public int getSlotId() {
        return slotId;
    }

    public void setSlotId(int slotId) {
        this.slotId = slotId;
    }

    public int getGameId() {
        return gameId;
    }

    public void setGameId(int gameId) {
        this.gameId = gameId;
    }

    public int getResourceId() {
        return resourceId;
    }

    public void setResourceId(int resourcesId) {
        this.resourceId = resourcesId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
