package learn.jailbreak.models;

import javax.persistence.*;

@Entity
public class GameEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int gameEventId;

    @Column(name="game_id")
    private int gameId;

    @Column(name="event_id")
    private int eventId;

}
