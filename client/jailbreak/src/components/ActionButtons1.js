import ResourceButton from "./ResourceButton";

function ActionButtons1({updateResource, triggerEvent}){
    function isTutorialComplete(){
        return JSON.parse(localStorage.getItem("eventState")).tutorialComplete;
    }
    
    function canTalk(){
        return JSON.parse(localStorage.getItem("eventState")).canTalk
            && (!JSON.parse(localStorage.getItem("eventState")).canBribe || JSON.parse(localStorage.getItem("eventState")).hasBribed);
    }
    
    function onShouldTriggerEvent(){
        const eventState = JSON.parse(localStorage.getItem("eventState"));
    
        if(eventState.canTalk && !eventState.canBribe){
            triggerEvent("talk_1");
        }else if(eventState.canTalk && eventState.hasBribed && !eventState.roomOpenedUp){
            triggerEvent("talk_2");
        }
    }
    
    return(
        <>
            <ResourceButton
                craftingRecipe={
                    JSON.stringify({
                        crafted: "cheese",
                        amount: 5,
                        costs: []
                    })
                }
                updateResource={updateResource} 
                content="Gather Cheese"></ResourceButton>
            {isTutorialComplete() && 
                <ResourceButton 
                    craftingRecipe={
                        JSON.stringify({
                            crafted: "yogies",
                            amount: 1,
                            costs: []
                        })
                    }
                    updateResource={updateResource} 
                    content="Gather Yogies"></ResourceButton>
            }
            {canTalk() && 
                <ResourceButton
                    onShouldTriggerEvent={onShouldTriggerEvent}
                    content="Talk"></ResourceButton>
            }
        </>
    )
}

export default ActionButtons1;