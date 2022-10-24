package learn.jailbreak.models;

import javax.persistence.*;
import java.util.List;

@Entity
public class Resources {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int resourceId;
    private String resourceName;
    private int resourceValue;
    private int resourceDefaultIncRate;

    @OneToMany(orphanRemoval = true)
    @JoinColumn(name = "resource_id", insertable = false, updatable = false, nullable = false)
    private List<InventorySlot> inventorySlotList;

    public List<InventorySlot> getInventorySlotList() {
        return inventorySlotList;
    }

    public void setInventorySlotList(List<InventorySlot> inventorySlotList) {
        this.inventorySlotList = inventorySlotList;
    }

    public int getResourceId() {
        return resourceId;
    }

    public void setResourceId(int resourceId) {
        this.resourceId = resourceId;
    }

    public String getResourceName() {
        return resourceName;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }

    public int getResourceValue() {
        return resourceValue;
    }

    public void setResourceValue(int resourceValue) {
        this.resourceValue = resourceValue;
    }

    public int getResourceDefaultIncRate() {
        return resourceDefaultIncRate;
    }

    public void setResourceDefaultIncRate(int resourceDefaultIncRate) {
        this.resourceDefaultIncRate = resourceDefaultIncRate;
    }
}
