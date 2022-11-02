//name without abbreviation: GameScreenMain_handleFreshEvents

import { updateJustAdded } from "../../services/gameEventService";

async function handleFreshEvents(event, eventState){
    if(event.gameEventObject.justAdded){
        switch(event.eventName){
            case "start":
                eventState.messages.push("You start off as a rat in a breeding facility. You notice that one rat in particular is stuck in a cage. You want to help your fellow brethren escape, so you have to devise a plan.");
                break;
            case "tutorial":
                eventState.messages.push("You notice that there are treats scattered around. Being a rat, you want to hoard food. You probably want to start collecting them.");

                eventState.messages.push("As you start finding more, you start to notice that other rats are taking interest in your project.");

                break;
            case "unlock_minions":
                eventState.messages.push("The others eye your stash hungrily. Give them some cheese, and you’ll get some extra cheese over time in reward.");
                break;
        }

        return await updateJustAdded(event.gameEventObject, false);
    }
}

export default handleFreshEvents;