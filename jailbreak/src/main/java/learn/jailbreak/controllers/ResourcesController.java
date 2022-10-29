package learn.jailbreak.controllers;

import learn.jailbreak.domain.ResourcesService;
import learn.jailbreak.models.Resources;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/resources")
public class ResourcesController {

    private final ResourcesService resourcesService;


    public ResourcesController(ResourcesService resourcesService) {
        this.resourcesService = resourcesService;
    }

    @GetMapping("/{resourcesId}")
    public ResponseEntity<Object> findByResourcesId(@PathVariable int resourcesId){
        Resources resources = resourcesService.findResourcesById(resourcesId);
        if(resources == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(resources);
    }

    @GetMapping("/name/{resourceName}")
    public ResponseEntity<Object> findByResourceName(@PathVariable String resourceName){
        Resources resources = resourcesService.findResourcesByName(resourceName);
        if(resources == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(resources);
    }

}
