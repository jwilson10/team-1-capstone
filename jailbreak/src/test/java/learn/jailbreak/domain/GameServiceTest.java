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
        game.setGameNumber(1);

        Game expected = new Game();
        expected.setCharacterName("Test");
        expected.setUserId(1);
        expected.setGameNumber(1);
        expected.setGameId(3);

        when(gameRepository.save(game)).thenReturn(expected);
        when(userRepository.findById(1)).thenReturn(Optional.of(createValidUser()));

        Result<Game> result = gameService.createGame(game);
        assertTrue(result.isSuccess());
        assertEquals(expected.getGameId(), result.getPayload().getGameId());
    }

    @Test
    void shouldNotCreateGameWithNoCharacterName(){
        Game game = createValidGame();
        game.setCharacterName("");

        when(gameRepository.save(game)).thenReturn(game);

        Result<Game> result = gameService.createGame(game);

        assertFalse(result.isSuccess());
        assertNull(result.getPayload());
        assertEquals(1, result.getMessages().size());
        assertEquals("Character name is required.", result.getMessages().get(0));
    }

    @Test
    void shouldNotAcceptNull(){
        when(gameRepository.save(null)).thenReturn(new Game());

        Result<Game> result = gameService.createGame(null);

        assertFalse(result.isSuccess());
        assertNull(result.getPayload());
        assertEquals(1, result.getMessages().size());
        assertEquals("Game cannot be null.", result.getMessages().get(0));
    }

    @Test
    void shouldNotAcceptGameForUserThatDoesNotExist(){
        when(userRepository.findById(99)).thenReturn(Optional.empty());
        Game game = createValidGame();
        game.setUserId(99);
        Result<Game> result = gameService.createGame(game);

        assertFalse(result.isSuccess());
        assertNull(result.getPayload());
        assertEquals(1, result.getMessages().size());
        assertEquals("User not found.", result.getMessages().get(0));
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
        assertEquals(1, result.getMessages().size());
        assertEquals("Game already exists in slot.", result.getMessages().get(0));

    }

    @Test
    void shouldNotCreateInvalidGameNumber(){
        Game game = createValidGame();
        game.setGameNumber(9);
        User user = createValidUser();
        when(userRepository.findById(game.getUserId())).thenReturn(Optional.of(user));

        Result<Game> result = gameService.createGame(game);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());
        assertEquals("Invalid game number.", result.getMessages().get(0));

    }

    @Test
    void shouldNotCreateTooManyGames(){
        Game game = createValidGame();
        game.setGameNumber(1);
        User user = createValidUser();
        List<Game> games = user.getGames();
        Game game2 = createValidGame();
        game.setGameNumber(2);
        Game game3 = createValidGame();
        game.setGameNumber(3);
        games.add(game2);
        games.add(game3);
        user.setGames(games);
        when(userRepository.findById(game.getUserId())).thenReturn(Optional.of(user));

        Result<Game> result = gameService.createGame(game);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());
        assertEquals("Maximum games already reached.", result.getMessages().get(0));
    }

    @Test
    void shouldUpdateValidGame(){
        User user = createValidUser();
        Game game = createValidGame();
        game.setCharacterName("Updated");
        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        Result<Game> result = gameService.update(game);
        assertTrue(result.isSuccess());
        assertNotNull(result.getPayload());
        assertEquals("Updated", result.getPayload().getCharacterName());
    }

    @Test
    void shouldNotUpdateNonExistentGame(){
        User user = createValidUser();
        Game game = createValidGame();
        game.setGameNumber(1);
        game.setCharacterName("Updated");
        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        Result<Game> result = gameService.update(game);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());
        assertEquals("Game not found.", result.getMessages().get(0));
    }

    @Test
    void shouldNotUpdateNullGame(){
        Result<Game> result = gameService.update(null);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());
        assertEquals("Game cannot be null.", result.getMessages().get(0));
    }

    @Test
    void shouldFindExistingGame(){
        User user = createValidUser();
        Game game = createValidGame();
        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        Result<Game> result = gameService.findGame(game);

        assertTrue(result.isSuccess());
        assertEquals("Test", result.getPayload().getCharacterName());
    }

    @Test
    void shouldNotFindNonExistentGame(){
        User user = createValidUser();
        Game game = createValidGame();
        game.setGameNumber(1);
        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        Result<Game> result = gameService.findGame(game);

        assertFalse(result.isSuccess());
        assertEquals("Game not found.", result.getMessages().get(0) );
    }

    @Test
    void shouldDeleteExistingGame(){
        User user = createValidUser();
        Game game = createValidGame();
        game.setGameId(0);
        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        Result<Game> result = gameService.deleteGame(game);
        assertTrue(result.isSuccess());
        assertEquals(1, result.getPayload().getGameId());
    }

    @Test
    void shouldNotDeleteNonExistentGame(){
        User user = createValidUser();
        Game game = createValidGame();
        game.setGameNumber(3);
        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        Result<Game> result = gameService.deleteGame(game);
        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());
        assertEquals("Game not found.", result.getMessages().get(0));
    }

    private static Game createValidGame(){
        Game game = new Game();
        game.setGameId(1);
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