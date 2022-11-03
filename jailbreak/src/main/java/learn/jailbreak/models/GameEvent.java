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

    private boolean justAdded;

    private boolean finished;

    public boolean isFinished() {
        return finished;
    }

    public void setFinished(boolean finished) {
        this.finished = finished;
    }

    public boolean isJustAdded() {
        return justAdded;
    }

    public void setJustAdded(boolean justAdded) {
        this.justAdded = justAdded;
    }

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
