package learn.jailbreak.domain;

import learn.jailbreak.data.GameRepository;
import learn.jailbreak.data.UserRepository;
import learn.jailbreak.models.Game;
import learn.jailbreak.models.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class GameServiceTest {

    @Autowired
    GameService gameService;

    @MockBean
    GameRepository gameRepository;

    @MockBean
    UserRepository userRepository;

    @Test
    void shouldCreateGame() {
        Game game = createValidGame();

        Game expected = new Game();
        expected.setCharacterName("Test");
        expected.setUserId(1);
        expected.setGameNumber(2);
        expected.setGameId(3);

        when(gameRepository.save(game)).thenReturn(expected);

        Result<Game> result = gameService.createGame(game);
        assertTrue(result.isSuccess());
        assertEquals(expected.getGameId(), result.getPayload().getGameId());
    }

    @Test
    void shouldNotCreateGameWithNoCharacterName(){
        Game game = new Game();


        when(gameRepository.save(game)).thenReturn(game);

        Result<Game> result = gameService.createGame(game);

        assertFalse(result.isSuccess());
        assertNull(result.getPayload());
    }

    @Test
    void shouldNotAcceptNull(){
        when(gameRepository.save(null)).thenReturn(new Game());

        Result<Game> result = gameService.createGame(null);

        assertFalse(result.isSuccess());
        assertNull(result.getPayload());
    }

    @Test
    void shouldNotAcceptGameForUserThatDoesNotExist(){
        when(userRepository.findById(99)).thenReturn(Optional.empty());
        Game game = createValidGame();
        game.setUserId(99);
        Result<Game> result = gameService.createGame(game);

        assertFalse(result.isSuccess());
        assertNull(result.getPayload());
    }

    @Test
    void shouldNotAcceptDuplicateGameSlot(){
        User user = createValidUser();
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        Game game = createValidGame();
        game.setUserId(1);

        Result<Game> result = gameService.createGame(game);
        assertFalse(result.isSuccess());
        assertNull(result.getPayload());

    }

    private static Game createValidGame(){
        Game game = new Game();
        game.setCharacterName("Test");
        game.setUserId(1);
        game.setGameNumber(2);
        return game;
    }

    private static User createValidUser(){
        User user = new User();
        user.setUsername("Test");
        user.setUserPassword("Test");
        user.setRoleId(1);
        List<Game> games = new ArrayList<>();
        games.add(createValidGame());
        user.setGames(games);
        return user;
    }
}