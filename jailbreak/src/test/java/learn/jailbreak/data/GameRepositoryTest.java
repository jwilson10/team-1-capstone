package learn.jailbreak.data;

import learn.jailbreak.models.Game;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.transaction.Transactional;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class GameRepositoryTest {

    @Autowired
    GameRepository repository;

    @Autowired
    JdbcTemplate jdbcTemplate;

    @BeforeEach
    void setup(){jdbcTemplate.update("call set_known_good_state();");}

    @Test
    @Transactional
    void shouldFindAll(){
        List<Game> games = repository.findAll();
        assertEquals(2, games.size());
    }

    @Test
    void shouldAddGame() {
        Game game = new Game();
        game.setGameNumber(2);
        game.setCharacterName("test");
        game.setUserId(1);

        Game actual = repository.save(game);
        assertNotNull(actual);
        assertEquals(3, actual.getGameId());
        assertEquals("test", actual.getCharacterName());
        assertEquals(2, actual.getGameNumber());
        assertEquals(1, actual.getUserId());
    }

    @Test
    void shouldUpdateGame(){
        //Arrange
        Game toUpdate = repository.findById(1).orElse(null);
        toUpdate.setCharacterName("Updated");
        //Act
        Game returned = repository.save(toUpdate);
        Game actual = repository.findById(1).orElse(null);

        //Assert
        assertNotNull(actual);
        assertNotNull(returned);
        assertEquals(toUpdate.getCharacterName(), actual.getCharacterName());
    }

    @Test
    void shouldDeleteGame(){
        //Arrange


        //Act
        repository.deleteById(1);

        //Assert
        assertNull(repository.findById(1).orElse(null));
    }


}