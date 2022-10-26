package learn.jailbreak.controllers;

import learn.jailbreak.domain.GameService;
import learn.jailbreak.domain.InventorySlotService;
import learn.jailbreak.domain.Result;
import learn.jailbreak.models.InventorySlot;
import learn.jailbreak.models.User;
import learn.jailbreak.models.Game;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/inventory")
public class InventorySlotController {

    private final InventorySlotService inventorySlotService;

    private final GameService gameService;

    public InventorySlotController(InventorySlotService inventorySlotService, GameService gameService) {
        this.inventorySlotService = inventorySlotService;
        this.gameService = gameService;
    }

    @PostMapping
    public ResponseEntity<Object> createInventorySlot(@AuthenticationPrincipal User user, @RequestBody InventorySlot inventorySlot) {
        Game game = gameService.findGameById(inventorySlot.getGameId());
        if (game == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else if (game.getUserId() != user.getUserId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<InventorySlot> result = inventorySlotService.create(inventorySlot);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    //TODO: Ask corbin about minutiae
    @PutMapping
    public ResponseEntity<Object> updateInventorySlot(@AuthenticationPrincipal User user, @RequestBody InventorySlot inventorySlot){
        Game game = gameService.findGameById(inventorySlot.getGameId());
        if (game == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else if (game.getUserId() != user.getUserId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<InventorySlot> result = inventorySlotService.create(inventorySlot);
        if(result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }
}