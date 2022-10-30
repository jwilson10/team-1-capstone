package learn.jailbreak.domain;

import learn.jailbreak.data.EventRepository;
import learn.jailbreak.models.Event;
import org.springframework.stereotype.Service;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public Event findByEventName(String name){
        return eventRepository.findByEventName(name);
    }

    public Event findByEventId(int eventId){
        return eventRepository.findById(eventId).orElse(null);
    }
}
