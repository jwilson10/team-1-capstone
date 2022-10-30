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

    public int getGameEventId() {
        return gameEventId;
    }

    public void setGameEventId(int gameEventId) {
        this.gameEventId = gameEventId;
    }

    public int getGameId() {
        return gameId;
    }

    public void setGameId(int gameId) {
        this.gameId = gameId;
    }

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }
}
