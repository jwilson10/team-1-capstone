package learn.jailbreak.domain;

import learn.jailbreak.data.GameRepository;
import learn.jailbreak.data.InventorySlotRepository;
import learn.jailbreak.data.ResourcesRepository;
import learn.jailbreak.models.Game;
import learn.jailbreak.models.InventorySlot;
import learn.jailbreak.models.Resources;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.persistence.criteria.CriteriaBuilder;

@Service
public class InventorySlotService {

    private final InventorySlotRepository inventorySlotRepository;

    private final ResourcesRepository resourcesRepository;

    private final GameRepository gameRepository;

    public InventorySlotService(InventorySlotRepository inventorySlotRepository, ResourcesRepository resourcesRepository, GameRepository gameRepository) {
        this.inventorySlotRepository = inventorySlotRepository;
        this.resourcesRepository = resourcesRepository;
        this.gameRepository = gameRepository;
    }

    //TODO: Find All Inventory Slots


    //TODO: Create Inventory Slot

    public Result<InventorySlot> create(InventorySlot inventorySlot){
        Result<InventorySlot> result = validate(inventorySlot);
        if(result.isSuccess()){
            result.setResultType(ResultType.SUCCESS);
            InventorySlot newSlot = inventorySlotRepository.save(inventorySlot);
        }
        return result;
    }

    //TODO: Decrease Quantity


    //TODO: Increase Quantity

    private Result<InventorySlot> validate(InventorySlot inventorySlot) {
        Result<InventorySlot> result = new Result<>();
        if(inventorySlot == null){
            result.addMessage("Inventory Slot is required");
            result.setResultType(ResultType.INVALID);
            return result;
        }
        Game game = gameRepository.findById(inventorySlot.getGameId()).orElse(null);
        if(game == null){
            result.addMessage("Game not found.");
            result.setResultType(ResultType.NOT_FOUND);
            return result;
        }
        Resources resources = resourcesRepository.findById(inventorySlot.getResourceId()).orElse(null);
        if(resources == null){
            result.addMessage("Resource not found.");
            result.setResultType(ResultType.NOT_FOUND);
            return result;
        }
        if(inventorySlot.getQuantity() < 0){
            result.addMessage("Amount cannot be negative.");
            result.setResultType(ResultType.INVALID);
        }
        return result;
    }

}
