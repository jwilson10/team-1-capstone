package learn.jailbreak.data;

import learn.jailbreak.models.Resources;
import learn.jailbreak.models.Role;
import learn.jailbreak.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.transaction.Transactional;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class UserRepositoryTest {
    @Autowired
    UserRepository repository;

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
        List<User> actual = repository.findAll();

        //Assert
        assertEquals(expected, actual.size());
    }

    @Test
    void shouldUpdateGame(){
        //Arrange
        User toUpdate = repository.findById(1).orElse(null);
        toUpdate.setUsername("Updated");
        //Act
        User returned = repository.save(toUpdate);
        User actual = repository.findById(1).orElse(null);

        //Assert
        assertNotNull(actual);
        assertNotNull(returned);
        assertEquals(toUpdate.getUsername(), actual.getUsername());
    }

    @Test
    void shouldDeleteUser(){
        //Act
        repository.deleteById(1);

        //Assert
        assertNull(repository.findById(1).orElse(null));
    }

    @Test
    void shouldFindByUsername(){
        //Arrange
        String username = "admin";

        //Act
        User user = repository.findByUsername(username);

        //Assert
        assertEquals(username, user.getUsername());
        assertEquals(1, user.getUserId());
    }
}
