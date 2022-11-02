import { useEffect, useState } from "react";
import "./ResourceButton.css";

function ResourceButton({craftingRecipe, updateResource, content, disabled, onShouldTriggerEvent}){
    const [isCoolingDown, setIsCoolingDown] = useState(false);
    const [cooldownTime, setCooldownTime] = useState(4000);

    useEffect(() => {
        if(!isCoolingDown || !updateResource) return;

        setTimeout(() => {
            setIsCoolingDown(false);
        }, cooldownTime);
    }, [isCoolingDown]);

    function onResourceButtonClick(evt){
        if(isCoolingDown || !updateResource) return;

        setIsCoolingDown(true);
        updateResource(evt);
    }

    return(
        <>
            {updateResource ?
                <button className={`btn mt-3 ${JSON.parse(craftingRecipe).crafted}`} craftingrecipe={craftingRecipe} onClick={onResourceButtonClick} disabled={isCoolingDown || disabled}>{content}</button>
                :
                <button className={`btn mt-3 event`} onClick={onShouldTriggerEvent}>{content}</button>
            }
        </>
    )
}

export default ResourceButton;