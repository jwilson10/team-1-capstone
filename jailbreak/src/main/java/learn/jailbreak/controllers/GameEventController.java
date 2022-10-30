package learn.jailbreak.controllers;

import learn.jailbreak.domain.GameEventService;
import learn.jailbreak.models.Event;
import learn.jailbreak.models.Game;
import learn.jailbreak.models.GameEvent;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/game/event")
public class GameEventController {
    private final GameEventService gameEventService;

    public GameEventController(GameEventService gameEventService) {
        this.gameEventService = gameEventService;
    }

}
