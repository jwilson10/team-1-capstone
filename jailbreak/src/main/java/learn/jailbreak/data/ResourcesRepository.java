package learn.jailbreak.data;

import learn.jailbreak.models.Resources;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResourcesRepository extends JpaRepository<Resources, Integer> {

    public Resources findByResourceName(String resourceName);

}
