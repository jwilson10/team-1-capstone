import { useEffect } from "react";
import { useState } from "react";
import { createInventorySlot, updateInventorySlot } from "../services/inventoryService";
import {findResourcesById, findResourcesByName} from "../services/resourcesService";


function ResourceDisplay({stateForUpdate, resourceUpdate, game, updateGame,
                            triggerTutorialEvent}){

    const [resources, setResources] = useState([]);

    useEffect(() => {
        if(!resourceUpdate){
            return;
        }

        async function updateInventory(){

            //Add or update an inventory slot.
            const found = resources.find(value => value.resourceName === resourceUpdate.resourceName);
            let slot = undefined;
            if(found){
                slot = found.slot;
                slot.quantity = parseInt(slot.quantity) + parseInt(resourceUpdate.amount);

                await updateInventorySlot(slot);
            }else{
                const resource = await findResourcesByName(resourceUpdate.resourceName);

                if(!resource){
                    return Promise.reject();
                }

                slot = {
                    resourceId: resource.resourceId,
                    quantity: resourceUpdate.amount,
                    gameId: game.gameId
                }

                await createInventorySlot(slot);
            }
        }

        updateInventory().then(() => {
            updateGame();
        }).catch(err => console.log("Could not update inventory: " + err));
    }, [resourceUpdate]);

    useEffect(() => {
        if(!game.inventorySlotList) return;
        
        //Map the inventory slots to their respective resources.
        async function loadResources() {
            const newResources = await Promise.all(game.inventorySlotList.map( async (slot) => {
                const result = await findResourcesById(slot.resourceId);
                const newResource = result;

                //Adding the slot to the resource state
                //makes displaying and updating simpler.
                newResource.slot = slot;
                return newResource;
            }));

            setResources(newResources);
        }

        loadResources();
    }, [game]);

    useEffect(() => {
        if(!resources) return;

        //Trigger the "tutorial" event when prerequisites are met
        const cheese = resources.find(resource => resource.resourceName === "cheese");
        if(cheese && cheese.slot.quantity >= 15){
            triggerTutorialEvent();
        }

        async function handleIncrements(){
            console.log("resources");
            console.log(resources);

            await Promise.all(
                resources.map(resource => {
                    if(!resource) return;


                    //Main Goal: update the inventory slot for each resource

                    //set the proper increment
                    let increment = 1;
                    switch(resource.resourceName){
                        case "cheese":
                            increment = 5;
                            break;
                    }
                    
                    const slot = resource.slot;
                    if(!slot) return;

                    slot.quantity = parseInt(slot.quantity) + increment;
                    return updateInventorySlot(slot);
                })
            );

            updateGame();
        }

        handleIncrements();
    }, [stateForUpdate]);

    function handleResources(){
        return(
            <>
                {resources.map((value, index) => 
                    <div className="row mt-3 justify-content-between" key={`${value.resourceName}-${index}`}>
                        <div className="col-4">{value.resourceName}</div>
                        <div className="col-4">{value.slot.quantity}</div>
                    </div>)}
            </>
        );
    }

    return(
        <>
            <div className="container-fluid">
                {handleResources()}
            </div>
        </>
    );
}

export default ResourceDisplay;