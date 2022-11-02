//name without abbreviation: GameScreenMain_handleFreshEvents

import { updateJustAdded } from "../../services/gameEventService";

async function handleFreshEvents(event, eventState, game){
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
            case "meeting":
                eventState.messages.push(`From across the cage, you notice an old, wise rat. He motions at you to come over. He must have noticed your increase in rat friends. As you get closer, he says "I can give you a distraction, but for a price."`);
                eventState.messages.push(`It seems that you'll need to bribe him with enough cheese to go through.`);
                break;
            case "talk_1":
                eventState.messages.push(`"What’s your price?"`);
                eventState.messages.push(`"Only 1000 cheese and 50 yogies."`);
                eventState.messages.push(`Only, he says... \n"Deal."`);
                eventState.messages.push(`You've now got a goal to reach - press “Bribe” to start the distraction.`);
                break;
            case "bribe":
                eventState.messages.push(`Now that you've bribed the fellow rat with your spoils, it's go-time.`);
                eventState.messages.push(`The elderly rat starts running around at a rapid pace, jumping at the walls. The humans on the outside take notice.`);
                eventState.messages.push(`As the humans are distracted with trying to subdue the elderly rat, you make your attack.`);
                eventState.messages.push(`As you run up to the cage, you notice that the actual cell is attached quite flimsily. You bite at the zip-tie lock, opening it and freeing the rat.`);
                break;
            case "talk_2":
                eventState.messages.push(`"Thank you. What’s your name?" says the rat.`);
                eventState.messages.push(`"${game.characterName}"`);
                eventState.messages.push(`"My name is Oatmeal. Glad to meet you. Now let’s get out of here."`);
                eventState.messages.push(`You may now access the room.`);
                break;
            case "enter_room":
                eventState.messages.push(`You both begin running to the opposite end of the cage, jumping over the barrier and into the outside. You notice a vent that you then crawl down into.`);
                break;
            case "escape":
                eventState.messages.push(`You've finally done it. You've reached the outside.`);
                eventState.messages.push(`Well, I guess the sewer counts.`);
                eventState.messages.push(`You’ve reached the end of our demo. Thanks for playing! Feel free to continue gaining resources, but there are no more events currently. -- Team Jailbreak`);
                break;
        }

        return await updateJustAdded(event.gameEventObject, false);
    }
}

export default handleFreshEvents;