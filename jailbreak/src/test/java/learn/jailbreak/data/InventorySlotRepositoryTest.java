package learn.jailbreak.data;

import learn.jailbreak.models.Game;
import learn.jailbreak.models.InventorySlot;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.transaction.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class InventorySlotRepositoryTest {
    @Autowired
    InventorySlotRepository repository;

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
        List<InventorySlot> actual = repository.findAll();

        //Assert
        assertEquals(expected, actual.size());
    }

    @Test
    @Transactional
    void shouldAddInventorySlot(){
        //Arrange
        int expected = 2;

        //Act
        List<InventorySlot> actual = repository.findAll();

        //Assert
        assertEquals(expected, actual.size());
    }

    @Test
    void shouldUpdateInventorySlot(){
        //Arrange
        InventorySlot toUpdate = repository.findById(1).orElse(null);
        toUpdate.setQuantity(9999);
        //Act
        InventorySlot returned = repository.save(toUpdate);
        InventorySlot actual = repository.findById(1).orElse(null);

        //Assert
        assertNotNull(actual);
        assertNotNull(returned);
        assertEquals(toUpdate.getQuantity(), actual.getQuantity());
    }

    @Test
    void shouldDeleteInventorySlot(){
        //Act
        repository.deleteById(1);
        //Assert
        assertNull(repository.findById(1).orElse(null));
    }
}
