package learn.jailbreak.domain;

import learn.jailbreak.data.EventRepository;
import learn.jailbreak.data.GameEventRepository;
import learn.jailbreak.data.GameRepository;
import learn.jailbreak.models.Game;
import learn.jailbreak.models.GameEvent;
import learn.jailbreak.models.InventorySlot;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameEventService {

    private final GameEventRepository gameEventRepository;

    private final EventRepository eventRepository;

    private final GameRepository gameRepository;


    public GameEventService(GameEventRepository gameEventRepository, EventRepository eventRepository, GameRepository gameRepository) {
        this.gameEventRepository = gameEventRepository;
        this.eventRepository = eventRepository;
        this.gameRepository = gameRepository;
    }

    public List<GameEvent> findGameEvents(int gameId){
        return gameEventRepository.findByGameId(gameId);
    }

    public Result<GameEvent> create(GameEvent gameEvent){
        Result<GameEvent> result = validate(gameEvent);
        if(result.isSuccess()){
            result.setResultType(ResultType.SUCCESS);
            GameEvent newGameEvent = gameEventRepository.save(gameEvent);
            result.setPayload(newGameEvent);
        }
        return result;
    }

    public Result<GameEvent> update(GameEvent gameEvent){
        Result<GameEvent> result = updateValidate(gameEvent);
        if(result.isSuccess()){
           result.setResultType(ResultType.SUCCESS);
           GameEvent newGameEvent = gameEventRepository.save(gameEvent);
           result.setPayload(newGameEvent);
        }
        return result;
    }

    private Result<GameEvent> updateValidate(GameEvent gameEvent) {
        Result<GameEvent> result = validate(gameEvent);
        if(!result.isSuccess()){
            return result;
        }
        GameEvent currentEvent = gameEventRepository.findById(gameEvent.getGameEventId()).orElse(null);
        if(currentEvent == null){
            result.addMessage("Game event not found.");
            return result;
        }
        if(gameEvent.getEventId() != currentEvent.getEventId() || gameEvent.getGameId() != currentEvent.getGameId()){
            result.addMessage("Cannot change game or event id!");
        }
        return result;
    }

    private Result<GameEvent> validate(GameEvent gameEvent) {
        Result<GameEvent> result = new Result<>();

        if(gameEvent == null){
            result.addMessage("Game Event cannot be null.");
            return result;
        }

        if(gameRepository.findById(gameEvent.getGameId()) == null){
            result.addMessage("Game not found.");
            return result;
        }

        if(eventRepository.findById(gameEvent.getEventId()) == null){
            result.addMessage("Event not found.");
        }

        return result;

    }

}
