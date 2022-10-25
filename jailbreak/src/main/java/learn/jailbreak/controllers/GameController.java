package learn.jailbreak.controllers;

import learn.jailbreak.domain.GameService;
import learn.jailbreak.domain.UserService;
import learn.jailbreak.models.Game;
import learn.jailbreak.models.User;
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
    //TODO: Implement create game
    @PostMapping
    public List<Game> createGame(@AuthenticationPrincipal User user, @RequestBody Game game){
        return new ArrayList<Game>();
    }


}
