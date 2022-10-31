package learn.jailbreak.controllers;

import learn.jailbreak.domain.EventService;
import learn.jailbreak.models.Event;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/event")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/{eventName}")
    public ResponseEntity<Object> findByEventName(@PathVariable String eventName){
        Event event = eventService.findByEventName(eventName);
        if(event == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(event);
    }
}
