import { useEffect } from "react";
import { useState } from "react";
import { createInventorySlot, updateInventorySlot } from "../services/inventoryService";
import {findResourcesById, findResourcesByName} from "../services/resourcesService";


function ResourceDisplay({stateForUpdate, resourceUpdate, game, updateGame,
                            triggerEvent, setMessages}){

    const [resources, setResources] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);

    function reduceMeetsCosts (previous, current){
        return [previous[0] && current[0]];
    }

    useEffect(() => {
        if(!resourceUpdate){
            return;
        }

        async function updateInventory(){
            //handle costs
            //map costs to booleans
            const meetsCosts = resourceUpdate.costs.map(cost => {
                const found = resources.find(value => value.resourceName === cost.resource);
                if(found){
                    return [found.slot.quantity >= cost.amount, cost, found];
                }

                return [false, cost, undefined];
            });

            //Are the costs met? Reduce to an array with a single true/false value
            const costsMet = meetsCosts.reduce(reduceMeetsCosts, [true]);

            //map the costs to a string and use that string to communicate costs
            const costsArray = resourceUpdate.costs.map(cost => `${cost.amount} ${cost.resource}`);
            const costsString = costsArray.join(", ");
            
            if(!costsMet[0]){
                setMessages({
                    messages: [`you need ${costsString}`]
                });
                return;
            }else{
                if(costsString === ""){
                    setMessages({
                        messages: [`you gain ${resourceUpdate.amount} ${resourceUpdate.crafted}`]
                    });
                }else{
                    //subtract costs from resource totals
                    await Promise.all(meetsCosts.map(async value => {
                        const slot = value[2].slot;
                        const cost = value[1];

                        slot.quantity = parseInt(slot.quantity) - parseInt(cost.amount);
                        return updateInventorySlot(slot);
                    }));
                    
                    setMessages({
                        messages: [`you lose ${costsString}. you gain a ${resourceUpdate.crafted} in return.`]
                    });
                }
            }

            //Add or update an inventory slot.
            const found = resources.find(value => value.resourceName === resourceUpdate.crafted);
            let slot = undefined;
            if(found){
                slot = found.slot;
                slot.quantity = parseInt(slot.quantity) + parseInt(resourceUpdate.amount);

                await updateInventorySlot(slot);
            }else{
                const resource = await findResourcesByName(resourceUpdate.crafted);

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

    //Some events triggered here
    useEffect(() => {
        if(!resources) return;

        let eventState = undefined;
        if(localStorage.getItem("eventState")){
            eventState = JSON.parse(localStorage.getItem("eventState"));
            
            const cheese = resources.find(resource => resource.resourceName === "cheese");
            const minions = resources.find(resource => resource.resourceName === "minions");

            //Some of these event triggers could be condensed into fewer if-else statements,
            //but I prefer being more verbose here. - Ethan

            //Trigger the "tutorial" event when prerequisites are met
            if(!eventState.tutorialComplete && cheese && cheese.slot.quantity >= 15){
                triggerEvent("tutorial");
            }
            //Trigger the "unlock_minions" event when prerequisites are met
            if(eventState.tutorialComplete && cheese && cheese.slot.quantity >= 40){
                triggerEvent("unlock_minions");
            }
            if(eventState.tutorialComplete && minions && minions.slot.quantity > 0){
                if(minions.slot.quantity < 9){
                    triggerEvent(`minion_gain_${minions.slot.quantity + 1}`);
                }else if(minions.slot.quantity === 10){
                    triggerEvent(`minion_gain_final`);
                }
            }
            if(eventState.tutorialComplete && minions && minions.slot.quantity > 3){
                triggerEvent("meeting");
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