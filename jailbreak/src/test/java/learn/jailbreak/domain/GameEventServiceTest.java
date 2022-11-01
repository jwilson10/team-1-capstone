package learn.jailbreak.domain;

import learn.jailbreak.data.EventRepository;
import learn.jailbreak.data.GameEventRepository;
import learn.jailbreak.data.GameRepository;
import learn.jailbreak.models.Event;
import learn.jailbreak.models.Game;
import learn.jailbreak.models.GameEvent;
import learn.jailbreak.models.InventorySlot;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class GameEventServiceTest {

    @Autowired
    GameEventService gameEventService;

    @MockBean
    GameRepository gameRepository;

    @MockBean
    GameEventRepository gameEventRepository;

    @MockBean
    EventRepository eventRepository;

    @Test
    void findGameEvents() {
        when(gameEventRepository.findByGameId(1)).thenReturn(List.of(createValidGameEvent()));

        List<GameEvent> gameEvents = gameEventService.findGameEvents(1);

        assertNotNull(gameEvents);
        assertEquals(1, gameEvents.size());
    }

    @Test
    void create() {
        GameEvent gameEvent = new GameEvent();
        gameEvent.setGameId(1);
        gameEvent.setEventId(1);
        when(gameEventRepository.save(gameEvent)).thenReturn(createValidGameEvent());
        when(gameRepository.findById(1)).thenReturn(Optional.of(createValidGame()));
        when(eventRepository.findById(1)).thenReturn(Optional.of(createValidEvent()));

        Result<GameEvent> result = gameEventService.create(gameEvent);
        assertTrue(result.isSuccess());
        assertEquals(1, result.getPayload().getGameEventId());
    }

    @Test
    void shouldNotAcceptNullGameEvents(){
        when(gameEventRepository.save(null)).thenReturn(createValidGameEvent());
        when(gameRepository.findById(1)).thenReturn(Optional.of(createValidGame()));
        when(eventRepository.findById(1)).thenReturn(Optional.of(createValidEvent()));

        Result<GameEvent> result = gameEventService.create(null);

        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());
        assertEquals("Game Event cannot be null.", result.getMessages().get(0));
        assertNull(result.getPayload());
    }

    @Test
    void shouldNotAcceptNonExistentGame(){
        GameEvent gameEvent = createValidGameEvent();
        gameEvent.setGameId(100);
        when(gameEventRepository.save(gameEvent)).thenReturn(createValidGameEvent());
        when(gameRepository.findById(100)).thenReturn(null);
        when(eventRepository.findById(1)).thenReturn(Optional.of(createValidEvent()));

        Result<GameEvent> result = gameEventService.create(gameEvent);

        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());
        assertEquals("Game not found.", result.getMessages().get(0));
        assertNull(result.getPayload());
    }

    @Test
    void
    shouldNotAcceptNonExistentEvent(){
        GameEvent gameEvent = createValidGameEvent();
        gameEvent.setEventId(100);
        when(gameEventRepository.save(gameEvent)).thenReturn(createValidGameEvent());
        when(gameRepository.findById(1)).thenReturn(Optional.of(createValidGame()));
        when(eventRepository.findById(100)).thenReturn(null);

        Result<GameEvent> result = gameEventService.create(gameEvent);

        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());
        assertEquals("Event not found.", result.getMessages().get(0));
        assertNull(result.getPayload());
    }

    @Test
    void shouldUpdate() {
        GameEvent gameEvent = createValidGameEvent();
        gameEvent.setJustAdded(false);
        gameEvent.setGameEventId(1);
        when(gameEventRepository.save(gameEvent)).thenReturn(gameEvent);
        when(gameEventRepository.findById(1)).thenReturn(Optional.of(createValidGameEvent()));
        when(gameRepository.findById(1)).thenReturn(Optional.of(createValidGame()));
        when(eventRepository.findById(1)).thenReturn(Optional.of(createValidEvent()));

        Result<GameEvent> result = gameEventService.update(gameEvent);
        assertTrue(result.isSuccess());
        assertEquals(1, result.getPayload().getGameEventId());
        assertEquals(false, result.getPayload().isJustAdded());
    }

    private static GameEvent createValidGameEvent(){
        GameEvent gameEvent = new GameEvent();
        gameEvent.setEventId(1);
        gameEvent.setGameId(1);
        gameEvent.setJustAdded(true);
        return gameEvent;
    }

    private static Game createValidGame(){
        Game game = new Game();
        game.setGameId(1);
        game.setCharacterName("Test");
        game.setUserId(1);
        game.setGameNumber(2);
        game.setInventorySlotList(List.of(new InventorySlot()));
        return game;
    }

    private static Event createValidEvent(){
        Event event = new Event();
        event.setEventId(1);
        event.setEventName("Test");
        return event;
    }


}