package learn.jailbreak.data;

import learn.jailbreak.models.Game;
import learn.jailbreak.models.InventorySlot;
import learn.jailbreak.models.Resources;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.transaction.Transactional;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class ResourcesRepositoryTest {
    @Autowired
    ResourcesRepository repository;

    @Autowired
    JdbcTemplate jdbcTemplate;

    @BeforeEach
    void setup(){jdbcTemplate.update("call set_known_good_state();");}

    @Test
    @Transactional
    void shouldFindAll(){
        //Arrange
        int expected = 2;

        //Act
        List<Resources> actual = repository.findAll();

        //Assert
        assertEquals(expected, actual.size());
    }

    @Test
    void shouldAddGame() {
        Resources resources = new Resources();
        resources.setResourceName("Toilet Paper");
        resources.setResourceValue(3);
        resources.setResourceDefaultIncRate(2);

        Resources actual = repository.save(resources);
        assertNotNull(actual);
        assertEquals(resources.getResourceName(), actual.getResourceName());
        assertEquals(resources.getResourceValue(), actual.getResourceValue());
        assertEquals(resources.getResourceDefaultIncRate(), actual.getResourceDefaultIncRate());
        assertEquals(3, actual.getResourceId());
    }

    @Test
    void shouldUpdateGame(){
        //Arrange
        Resources toUpdate = repository.findById(1).orElse(null);
        toUpdate.setResourceName("Updated");
        //Act
        Resources returned = repository.save(toUpdate);
        Resources actual = repository.findById(1).orElse(null);

        //Assert
        assertNotNull(actual);
        assertNotNull(returned);
        assertEquals(toUpdate.getResourceName(), actual.getResourceName());
    }

    @Test
    void shouldDeleteResources(){
        //Arrange


        //Act
        repository.deleteById(1);

        //Assert
        assertNull(repository.findById(1).orElse(null));
    }
}
