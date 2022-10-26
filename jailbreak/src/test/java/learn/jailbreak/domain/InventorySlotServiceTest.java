package learn.jailbreak.domain;

import learn.jailbreak.data.GameRepository;
import learn.jailbreak.data.InventorySlotRepository;
import learn.jailbreak.data.ResourcesRepository;
import learn.jailbreak.models.Game;
import learn.jailbreak.models.InventorySlot;
import learn.jailbreak.models.Resources;
import learn.jailbreak.models.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class InventorySlotServiceTest {

    @Autowired
    InventorySlotService inventorySlotService;

    @MockBean
    InventorySlotRepository inventorySlotRepository;

    @MockBean
    GameRepository gameRepository;

    @MockBean
    ResourcesRepository resourcesRepository;

    @Test
    void shouldCreateValidInventorySlot() {
        Game game = createValidGame();
        InventorySlot inventorySlot = createValidInventorySlot();
        Resources resources = createValidResources();
        when(resourcesRepository.findById(1)).thenReturn(Optional.of(resources));
        when(gameRepository.findById(1)).thenReturn(Optional.of(game));
        InventorySlot expected = createValidInventorySlot();
        expected.setSlotId(1);
        when(inventorySlotRepository.save(inventorySlot)).thenReturn(expected);

        Result<InventorySlot> result = inventorySlotService.create(inventorySlot);

        assertTrue(result.isSuccess());
        assertEquals(ResultType.SUCCESS, result.getResultType());
        assertEquals(1, result.getPayload().getSlotId());

    }

    @Test
    void shouldNotAcceptNullInventorySlot(){
        Result<InventorySlot> result = inventorySlotService.create(null);

        assertFalse(result.isSuccess());
        assertEquals(ResultType.INVALID, result.getResultType());
        assertEquals(1, result.getMessages().size());
        assertEquals("Inventory Slot is required", result.getMessages().get(0));
    }

    @Test
    void shouldNotAcceptNonExistentGame(){
        InventorySlot inventorySlot = createValidInventorySlot();
        Resources resources = createValidResources();
        when(resourcesRepository.findById(1)).thenReturn(Optional.of(resources));
        when(gameRepository.findById(1)).thenReturn(Optional.empty());
        InventorySlot expected = createValidInventorySlot();
        expected.setSlotId(1);
        when(inventorySlotRepository.save(inventorySlot)).thenReturn(expected);

        Result<InventorySlot> result = inventorySlotService.create(inventorySlot);

        assertFalse(result.isSuccess());
        assertNull(result.getPayload());
        assertEquals(ResultType.NOT_FOUND, result.getResultType());
        assertEquals(1, result.getMessages().size());
        assertEquals("Game not found.", result.getMessages().get(0));
    }

    @Test
    void shouldNotAcceptNonExistentResource(){
        InventorySlot inventorySlot = createValidInventorySlot();
        Game game = createValidGame();
        when(resourcesRepository.findById(1)).thenReturn(Optional.empty());
        when(gameRepository.findById(1)).thenReturn(Optional.of(game));
        InventorySlot expected = createValidInventorySlot();
        expected.setSlotId(1);
        when(inventorySlotRepository.save(inventorySlot)).thenReturn(expected);

        Result<InventorySlot> result = inventorySlotService.create(inventorySlot);

        assertFalse(result.isSuccess());
        assertEquals(ResultType.NOT_FOUND, result.getResultType());
        assertEquals(1, result.getMessages().size());
        assertEquals("Resource not found.", result.getMessages().get(0));
    }

    @Test
    void shouldNotAcceptNegativeQuantity(){
        Game game = createValidGame();
        InventorySlot inventorySlot = createValidInventorySlot();
        inventorySlot.setQuantity(-1);
        Resources resources = createValidResources();
        when(resourcesRepository.findById(1)).thenReturn(Optional.of(resources));
        when(gameRepository.findById(1)).thenReturn(Optional.of(game));
        InventorySlot expected = createValidInventorySlot();
        expected.setSlotId(1);
        when(inventorySlotRepository.save(inventorySlot)).thenReturn(expected);

        Result<InventorySlot> result = inventorySlotService.create(inventorySlot);

        assertFalse(result.isSuccess());
        assertEquals(ResultType.INVALID, result.getResultType());
        assertNull(result.getPayload());
        assertEquals(1, result.getMessages().size());
        assertEquals("Amount cannot be negative.", result.getMessages().get(0));
    }

    @Test
    void shouldUpdateValidInventorySlot() {
        Game game = createValidGame();
        InventorySlot inventorySlot = createValidInventorySlot();
        inventorySlot.setQuantity(100);
        inventorySlot.setSlotId(1);
        Resources resources = createValidResources();
        when(resourcesRepository.findById(1)).thenReturn(Optional.of(resources));
        when(gameRepository.findById(1)).thenReturn(Optional.of(game));
        when(inventorySlotRepository.save(inventorySlot)).thenReturn(inventorySlot);

        Result<InventorySlot> result = inventorySlotService.create(inventorySlot);

        assertTrue(result.isSuccess());
        assertEquals(ResultType.SUCCESS, result.getResultType());
        assertEquals(1, result.getPayload().getSlotId());

    }

    private static InventorySlot createValidInventorySlot(){
        InventorySlot inventorySlot = new InventorySlot();
        inventorySlot.setQuantity(1);
        inventorySlot.setGameId(1);
        inventorySlot.setResourceId(1);
        return inventorySlot;
    }

    private static Game createValidGame(){
        Game game = new Game();
        game.setGameId(1);
        game.setCharacterName("Test");
        game.setUserId(1);
        game.setGameNumber(2);
        game.setInventorySlotList(List.of(createValidInventorySlot()));
        return game;
    }

    private static Resources createValidResources(){
        Resources resources = new Resources();
        resources.setResourceDefaultIncRate(1);
        resources.setResourceName("Test");
        resources.setResourceId(1);
        resources.setResourceValue(1);
        resources.setInventorySlotList(List.of(createValidInventorySlot()));
        return resources;
    }
}