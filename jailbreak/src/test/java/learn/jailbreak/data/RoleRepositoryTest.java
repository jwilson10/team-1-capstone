package learn.jailbreak.data;

import learn.jailbreak.models.Resources;
import learn.jailbreak.models.Role;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.transaction.Transactional;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class RoleRepositoryTest {
    @Autowired
    RoleRepository repository;

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
        List<Role> actual = repository.findAll();

        //Assert
        assertEquals(expected, actual.size());
    }

    @Test
    void shouldUpdateGame(){
        //Arrange
        Role toUpdate = repository.findById(1).orElse(null);
        toUpdate.setRoleName("Updated");
        //Act
        Role returned = repository.save(toUpdate);
        Role actual = repository.findById(1).orElse(null);

        //Assert
        assertNotNull(actual);
        assertNotNull(returned);
        assertEquals(toUpdate.getRoleName(), actual.getRoleName());
    }
}
