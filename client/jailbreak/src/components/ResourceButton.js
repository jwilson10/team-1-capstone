import { useEffect, useState } from "react";
import "./ResourceButton.css";

function ResourceButton({resourceName, amount, updateResource, content, disabled}){
    const [isCoolingDown, setIsCoolingDown] = useState(false);
    const [cooldownTime, setCooldownTime] = useState(3000);

    useEffect(() => {
        if(!isCoolingDown) return;

        setTimeout(() => {
            setIsCoolingDown(false);
        }, cooldownTime);
    }, [isCoolingDown]);

    function onResourceButtonClick(evt){
        if(isCoolingDown) return;

        setIsCoolingDown(true);
        updateResource(evt);
    }

    return(
        <>
            <button className={`btn mt-3 ${resourceName}`} resourcename={resourceName} amount={amount} onClick={onResourceButtonClick} disabled={isCoolingDown || disabled}>{content}</button>
        </>
    )
}

export default ResourceButton;