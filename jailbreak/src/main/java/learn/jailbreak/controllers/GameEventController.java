package learn.jailbreak.controllers;

import learn.jailbreak.domain.GameEventService;
import learn.jailbreak.domain.GameService;
import learn.jailbreak.domain.Result;
import learn.jailbreak.models.Game;
import learn.jailbreak.models.GameEvent;
import learn.jailbreak.models.User;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/game/event")
public class GameEventController {
    private final GameEventService gameEventService;

    private final GameService gameService;



    public GameEventController(GameEventService gameEventService, GameService gameService) {
        this.gameEventService = gameEventService;
        this.gameService = gameService;
    }

    @GetMapping("/{gameId}")
    public ResponseEntity<Object> findGameEvent(@PathVariable int gameId){
        List<GameEvent> gameEvents = gameEventService.findGameEvents(gameId);
        if(gameEvents == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(gameEvents);
    }


    @PostMapping
    public ResponseEntity<Object> create(@AuthenticationPrincipal User user, @RequestBody GameEvent gameEvent){
        if(gameEvent == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); //don't want a null gameEvent
        }
        Game game = gameService.findGameById(gameEvent.getGameId());
        if(game == null || game.getUserId() != user.getUserId()){
            return new ResponseEntity<>(HttpStatus.CONFLICT); //don't want them modifying other user's stuff
        }
        Result<GameEvent> result = gameEventService.create(gameEvent);
        if(result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping
    public ResponseEntity<Object> update(@AuthenticationPrincipal User user, @RequestBody GameEvent gameEvent){
        if(gameEvent == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); //don't want a null gameEvent
        }
        Game game = gameService.findGameById(gameEvent.getGameId());
        if(game == null || game.getUserId() != user.getUserId()){
            return new ResponseEntity<>(HttpStatus.CONFLICT); //don't want them modifying other user's stuff
        }
        Result<GameEvent> result = gameEventService.update(gameEvent);
        if(result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }
}
