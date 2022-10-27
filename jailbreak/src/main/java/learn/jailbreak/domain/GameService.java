package learn.jailbreak.domain;

import learn.jailbreak.data.GameRepository;
import learn.jailbreak.data.UserRepository;
import learn.jailbreak.models.Game;
import learn.jailbreak.models.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GameService {

    private final GameRepository gameRepository;

    private final UserRepository userRepository;

    public GameService(GameRepository gameRepository, UserRepository userRepository) {
        this.gameRepository = gameRepository;
        this.userRepository = userRepository;
    }

    public Result<List<Game>> findAllForUser(String username){
        User user = userRepository.findByUsername(username);
        List<Game> gameList = new ArrayList<>();
        Result<List<Game>> result = new Result<>();
        if(user == null){
            result.addMessage("User Not Found.");
            result.setResultType(ResultType.NOT_FOUND);
            return result;
        }

        //TODO: Do we want to change result type if there are none found? Technically a success but also not found
        gameList = user.getGames();
        result.setPayload(gameList);
        result.setResultType(ResultType.SUCCESS);
        return result;
    }

    public Result<Game> createGame(Game game){
        Result<Game> result = validate(game);
        if(!result.isSuccess()){
            return result;
        }
        result = validateGameNumber(game);
        if(!result.isSuccess()){
            return result;
        }
        result = validateGameNumber(game);
        if(!result.isSuccess()){
            return result;
        }
        Game newGame = gameRepository.save(game);
        if(newGame == null){
            result.addMessage("Unable to create game.");
            result.setResultType(ResultType.INVALID);
        } else{
            result.setPayload(newGame);
            result.setResultType(ResultType.SUCCESS);
        }
        return result;
    }

    public Game findGameById(int id){
        return gameRepository.findById(id).orElse(null);
    }

    public Result<Game> findGame(Game game) {
        return updateValidation(game);
    }

    public Result<Game> update(Game game){
        Result<Game> result = updateValidation(game);
        if(result.isSuccess()){
            gameRepository.save(game);
            result.setResultType(ResultType.SUCCESS);
        }
        return result;
    }

    public Result<Game> deleteGame(Game game){
        Result<Game> result = updateValidation(game);
        if(result.isSuccess()){
            gameRepository.deleteById(result.getPayload().getGameId());
            result.setResultType(ResultType.SUCCESS);
        }
        return result;
    }

    private Result<Game> validate(Game game){
        Result<Game> result = new Result<>();
        if(game == null){
            result.addMessage("Game cannot be null.");
            result.setResultType(ResultType.INVALID);
            return result;
        }
        result = validateName(game);
        if(game.getGameNumber() < 1 || game.getGameNumber() > 3){
            result.addMessage("Invalid game number.");
            result.setResultType(ResultType.INVALID);
            return result;
        }
        return result;
    }

    private Result<Game> validateName(Game game){
        Result<Game> result = new Result<>();
        if(game.getCharacterName() == null || game.getCharacterName().isBlank()){
            result.addMessage("Character name is required.");
            result.setResultType(ResultType.INVALID);
        }
        return result;
    }

    private Result<Game> updateValidation(Game game){
        Result<Game> result = validate(game);
        if(!result.isSuccess()){
            return result;
        }
        User user = userRepository.findById(game.getUserId()).orElse(null);
        if(user == null){
            result.addMessage("User not found.");
            result.setResultType(ResultType.NOT_FOUND);
            return result;
        }
        List<Game> games = user.getGames();
        for(Game g : games){
            if(g.getGameNumber() == game.getGameNumber()){
                if(game.getCharacterName().equalsIgnoreCase("Dummy Name")){
                    game = g;
                }
                game.setGameId(g.getGameId());
                game.setInventorySlotList(g.getInventorySlotList());
                result.setPayload(game);
                result.setResultType(ResultType.SUCCESS);
                return result;
            }
        }
        result.addMessage("Game not found.");
        result.setResultType(ResultType.NOT_FOUND);
        return result;
    }

    private Result<Game> validateGameNumber(Game game) {
        Result<Game> result = new Result<>();
        User user = userRepository.findById(game.getUserId()).orElse(null);
        if(user == null){
            result.addMessage("User not found.");
            result.setResultType(ResultType.NOT_FOUND);
            return result;
        }
        List<Game> games = user.getGames();
        if(games.size() == 3){
            result.addMessage("Maximum games already reached.");
            result.setResultType(ResultType.INVALID);
            return result;
        }
        for(Game g : games){
            if(game.getGameNumber() == g.getGameNumber()){
                result.addMessage("Game already exists in slot.");
                result.setResultType(ResultType.INVALID);
                return result;
            }
        }
        return result;
    }
}
