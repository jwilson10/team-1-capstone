package learn.jailbreak.domain;

import learn.jailbreak.data.ResourcesRepository;
import learn.jailbreak.models.Resources;
import org.springframework.stereotype.Service;

@Service
public class ResourcesService {

    private final ResourcesRepository resourcesRepository;


    public ResourcesService(ResourcesRepository resourcesRepository) {
        this.resourcesRepository = resourcesRepository;
    }

    public Resources findResourcesById(int resourcesId){
        return resourcesRepository.findById(resourcesId).orElse(null);
    }
}
