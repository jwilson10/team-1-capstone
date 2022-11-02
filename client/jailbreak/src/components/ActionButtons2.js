import { useEffect, useState } from "react";
import ResourceButton from "./ResourceButton";

function ActionButtons2({updateResource, stateForUpdate}){
    const [showMinions, setShowMinions] = useState(false);

    useEffect(() => {
        if(localStorage && localStorage.getItem("eventState")){
            const eventState = JSON.parse(localStorage.getItem("eventState"));

            if(eventState.showMinionsButton){
                setShowMinions(true);
            }
        }
    }, [stateForUpdate]);

    function canStillAddMinions(){
        return JSON.parse(localStorage.getItem("eventState")).noMoreMinions;
    }
    
    return(
        <>
            { showMinions ?
                <ResourceButton 
                    craftingRecipe={
                        JSON.stringify({
                            crafted: "minions",
                            amount: 1,
                            costs: [
                                {resource: "cheese", amount: 50}
                            ]
                        })
                    }
                    updateResource={updateResource} 
                    content="Gather Minions"
                    disabled={canStillAddMinions()}></ResourceButton>
                :
                <></>
            }
        </>
    )
}

export default ActionButtons2;