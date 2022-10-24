package learn.jailbreak.data;

import learn.jailbreak.models.InventorySlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventorySlotRepository extends JpaRepository<InventorySlot, Integer> {
}
