package learn.jailbreak.controllers;

import learn.jailbreak.domain.GameService;
import learn.jailbreak.domain.Result;
import learn.jailbreak.domain.UserService;
import learn.jailbreak.models.Game;
import learn.jailbreak.models.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/game")
public class GameController {

    private final GameService service;

    private final UserService userService;

    public GameController(GameService service, UserService userService) {
        this.service = service;
        this.userService = userService;
    }
    @GetMapping
    public List<Game> findAllForUser(@AuthenticationPrincipal User user){
        List<Game> games = service.findAllForUser(user.getUsername()).getPayload();
        return games;
    }

    @PostMapping
    public ResponseEntity<Object> createGame(@AuthenticationPrincipal User user, @RequestBody Game game){
        game.setUserId(user.getUserId()); //in case someone tries doing something to someone else's game..
        Result<Game> result = service.createGame(game);
        if(result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }


}
