package learn.jailbreak.data;

import learn.jailbreak.models.Event;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.transaction.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class EventRepositoryTest {

    @Autowired
    EventRepository repository;

    @Autowired
    JdbcTemplate jdbcTemplate;

    @BeforeEach
    void setup(){jdbcTemplate.update("call set_known_good_state();");}

    @Test
    @Transactional
    void shouldFindAll(){
        List<Event> events = repository.findAll();
        assertEquals(2, events.size());
    }

    @Test
    void shouldFindEventById(){
        Event event = repository.findById(1).orElse(null);

        assertNotNull(event);
        assertEquals(1, event.getEventId());
        assertEquals("tutorial", event.getEventName());
    }

    @Test
    void shouldFindByEventName(){
        Event event = repository.findByEventName("tutorial");

        assertNotNull(event);
        assertEquals(1, event.getEventId());
        assertEquals("tutorial", event.getEventName());
    }

}