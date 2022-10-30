package learn.jailbreak.data;

import learn.jailbreak.models.GameEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameEventRepository extends JpaRepository<GameEvent, Integer> {

    List<GameEvent> findByGameId(int gameId);

}
