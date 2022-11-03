//name without abbreviation: GameScreenMain_handleFreshEvents

import { updateJustAddedAndFinished } from "../../services/gameEventService";

async function handleFreshEvents(event, eventState, game){
    if(event.gameEventObject.justAdded){
        switch(event.eventName){
            case "start":
                eventState.messages.push(
                    {
                        message: "You start off as a rat in a breeding facility. You notice that one rat in particular is stuck in a cage. You want to help your fellow brethren escape, so you have to devise a plan.",
                        gameEvent: event.gameEventObject
                    });
                break;
            case "tutorial":
                eventState.messages.push(
                    {
                        message: "You notice that there are treats scattered around. Being a rat, you want to hoard food. You probably want to start collecting them.",
                        gameEvent: event.gameEventObject
                    });

                eventState.messages.push(
                    {
                        message: "As you start finding more, you start to notice that other rats are taking interest in your project.",
                        gameEvent: event.gameEventObject
                    });

                break;
            case "unlock_minions":
                eventState.messages.push(
                    {
                        message: "The others eye your stash hungrily. Give them some cheese, and you’ll get some extra cheese over time in reward.",
                        gameEvent: event.gameEventObject
                    });
                break;
            case "meeting":
                eventState.messages.push(
                    {
                        message: `From across the cage, you notice an old, wise rat. He motions at you to come over. He must have noticed your increase in rat friends. As you get closer, he says "I can give you a distraction, but for a price."`,
                    });
                eventState.messages.push(
                    {
                        message: `It seems that you'll need to bribe him with enough cheese to go through.`,
                        gameEvent: event.gameEventObject
                    });
                break;
            case "talk_1":
                eventState.messages.push({message: `"What’s your price?"`});
                eventState.messages.push({message: `"Only 1000 cheese and 30 yogies."`});
                eventState.messages.push({message: `Only, he says... "Deal."`});
                eventState.messages.push(
                    {
                        message: `You've now got a goal to reach - press “Bribe” to start the distraction.`,
                        gameEvent: event.gameEventObject
                    });
                break;
            case "bribe":
                eventState.messages.push({message: `Now that you've bribed the fellow rat with your spoils, it's go-time.`});
                eventState.messages.push({message: `The elderly rat starts running around at a rapid pace, jumping at the walls. The humans on the outside take notice.`});
                eventState.messages.push({message: `As the humans are distracted with trying to subdue the elderly rat, you make your attack.`});
                eventState.messages.push({message: `As you run up to the cage, you notice that the actual cell is attached quite flimsily. You bite at the zip-tie lock, opening it and freeing the rat.`});
                eventState.messages.push(
                    {
                        message: `The old rat has something to say...`,
                        gameEvent: event.gameEventObject
                    });
                break;
            case "talk_2":
                eventState.messages.push({message: `"Thank you. What’s your name?" says the rat.`});
                eventState.messages.push({message: `"${game.characterName}"`});
                eventState.messages.push({message: `"My name is Oatmeal. Glad to meet you. Now let’s get out of here."`});
                eventState.messages.push(
                    {
                        message: `You may now access the room.`,
                        gameEvent: event.gameEventObject
                    });
                break;
            case "enter_room":
                eventState.messages.push(
                    {
                        message: `You both begin running to the opposite end of the cage, jumping over the barrier and into the outside. You notice a vent that you then crawl down into.`,
                        gameEvent: event.gameEventObject
                    });
                break;
            case "escape":
                eventState.messages.push(`You've finally done it. You've reached the outside.`);
                eventState.messages.push(`Well, I guess the sewer counts.`);
                eventState.messages.push(
                    {
                        message: `You’ve reached the end of our demo. Thanks for playing! Feel free to continue gaining resources, but there are no more events currently. -- Team Jailbreak`,
                        gameEvent: event.gameEventObject
                    });
                break;
        }

        return await updateJustAddedAndFinished(event.gameEventObject, false);
    }
}

export default handleFreshEvents;