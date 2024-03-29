package learn.jailbreak.data;

import learn.jailbreak.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {

    public Event findByEventName(String eventName);

}
