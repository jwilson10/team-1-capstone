import { useEffect } from "react";
import { useState } from "react";

function ResourceDisplay({resourceUpdate}){

    const [resources, setResources] = useState([
        {
            resourceName: "cheese",
            amount: 10
        }
    ]);

    useEffect(() => {
        const newResources = [...resources];
        const found = newResources.find(value => value.resourceName === resourceUpdate.resourceName);
        if(found){
            found.amount = parseInt(found.amount) + parseInt(resourceUpdate.amount);
        }else{
            newResources[newResources.length] = {
                resourceName: resourceUpdate.resourceName,
                amount: resourceUpdate.amount
            };
        }

        setResources(newResources);
    }, [resourceUpdate]);

    function handleResources(){
        return(
            <>
                {resources.map((value, index) => 
                    <div className="row mt-3 justify-content-between" key={`${value.resourceName}-${index}`}>
                        <div className="col-4">{value.resourceName}</div>
                        <div className="col-4">{value.amount}</div>
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