import { useEffect } from "react";
import { useState } from "react";
import { createInventorySlot, updateInventorySlot } from "../services/inventoryService";
import {findResourcesById, findResourcesByName} from "../services/resourcesService";


function ResourceDisplay({stateForUpdate, resourceUpdate, game, updateGame,
                            triggerEvent}){

    const [resources, setResources] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);

    useEffect(() => {
        if(!resourceUpdate){
            return;
        }

        async function updateInventory(){
            if(resourceUpdate.amount > 0){
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
            } else{
                let cheeseResource = await findResourcesByName("cheese");
                let cheese = undefined;
                for(let s of cheeseResource.inventorySlotList){
                    if(game.gameId == s.gameId){
                        cheese = s.quantity;
                        break;
                    }
                }
                //is there enough cheese?
                if(!cheese || cheese < (resourceUpdate.amount * -1)){
                    window.alert(`You don't have enough cheese! You need at least ${resourceUpdate.amount * -1} cheese.`);
                }
                //if yes, remove cheese
                else{
                    //update inventory slot (or create one)
                    const found = resources.find(value => value.resourceName === resourceUpdate.resourceName);
                    let slot = undefined;
                    let newQuantity = 0;
                    if(found){
                        let slotResourceId = found.resourceId;
                        let currentSlot = game.inventorySlotList.find(value => value.resourceId === found.resourceId);
                        newQuantity = currentSlot.quantity + 1;
                        slot ={
                            slotId: currentSlot.slotId,
                            resourceId: slotResourceId,
                            quantity: newQuantity,
                            gameId: game.gameId
                        }
                        await updateInventorySlot(slot);
                    }else{
                        const resource = await findResourcesByName(resourceUpdate.resourceName);
                        const newQuantity = 1;

                        if(!resource){
                            return Promise.reject();
                        }

                        slot = {
                            resourceId: resource.resourceId,
                            quantity: newQuantity,
                            gameId: game.gameId
                        }
                        await createInventorySlot(slot);
                }
                    let cheeseSlot = game.inventorySlotList.find(value => value.resourceId === cheeseResource.resourceId);
                    cheeseSlot.quantity = cheeseSlot.quantity - 5;
                    await updateInventorySlot(cheeseSlot);
                }
                    
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

    //Some events triggered here
    useEffect(() => {
        if(!resources) return;

        let eventState = undefined;
        if(localStorage.getItem("eventState")){
            eventState = JSON.parse(localStorage.getItem("eventState"));
            
            const cheese = resources.find(resource => resource.resourceName === "cheese");
            const minions = resources.find(resource => resource.resourceName === "minions");

            //Trigger the "tutorial" event when prerequisites are met
            if(!eventState.tutorialComplete && cheese && cheese.slot.quantity >= 15){
                triggerEvent("tutorial");
            }
            //Trigger the "unlock_minions" event when prerequisites are met
            if(eventState.tutorialComplete && cheese && cheese.slot.quantity >= 60){
                triggerEvent("unlock_minions");
            }
            if(eventState.tutorialComplete && minions && minions.slot.quantity > 0){
                if(minions.slot.quantity < 9){
                    triggerEvent(`minion_gain_${minions.slot.quantity + 1}`);
                }else if(minions.slot.quantity === 10){
                    triggerEvent(`minion_gain_final`);
                }
            }
        }

        async function handleIncrements(){
            if(!localStorage.getItem("eventState")){
                return;
            }

            const eventState = JSON.parse(localStorage.getItem("eventState"));
            if(!eventState){
                return;
            }

            await Promise.all(
                resources.map(resource => {
                    if(!resource) return;


                    //Main Goal: update the inventory slot for each resource

                    //set the proper increment
                    let increment = 0;
                    switch(resource.resourceName){
                        case "cheese":
                            increment = eventState.cheeseIncrement;
                            break;
                        case "yogies":
                            increment = eventState.yogiesIncrement;
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