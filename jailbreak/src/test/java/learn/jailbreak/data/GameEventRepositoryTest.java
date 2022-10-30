package learn.jailbreak.data;

import learn.jailbreak.models.GameEvent;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.transaction.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class GameEventRepositoryTest {

    @Autowired
    GameEventRepository gameEventRepository;

    @Autowired
    JdbcTemplate jdbcTemplate;

    @BeforeEach
    void setup(){jdbcTemplate.update("call set_known_good_state();");}

    @Test
    @Transactional
    void shouldFindAll(){
        List<GameEvent> gameEvents = gameEventRepository.findAll();
        assertEquals(3, gameEvents.size());
    }

    @Test
    void shouldAddGameEvent(){
        GameEvent gameEvent = new GameEvent();
        gameEvent.setEventId(2);
        gameEvent.setGameId(1);

        GameEvent actual = gameEventRepository.save(gameEvent);

        assertNotNull(actual);
        assertEquals(4, actual.getGameEventId());
    }

    @Test
    void shouldFindByGameId(){
        List<GameEvent> gameEvents = gameEventRepository.findByGameId(2);

        assertNotNull(gameEvents);
        assertEquals(2, gameEvents.size());
        assertEquals(1, gameEvents.get(0).getEventId());
        assertEquals(2, gameEvents.get(1).getEventId());
    }

}