import { useEffect } from "react";
import { useState } from "react";
import {findResourcesById} from "../services/resourcesService";

function ResourceDisplay({initialResources, resourceUpdate}){

    const [resources, setResources] = useState([]);

    useEffect(() => {
        const newResources = [...resources];
        const found = newResources.find(value => value.resourceName === resourceUpdate.resourceName);
        if(found){
            found.quantity = parseInt(found.quantity) + parseInt(resourceUpdate.amount);
        }else{
            newResources[newResources.length] = {
                resourceName: resourceUpdate.resourceName,
                quantity: resourceUpdate.amount
            };
        }

        setResources(newResources);
    }, [resourceUpdate]);

    useEffect(() => {
        async function setupInitialResources() {
            const newResources = await Promise.all(initialResources.map( async (resource) => {
                const newResource = {...resource};
                
                const result = await findResourcesById(newResource.resourceId);
                newResource.resourceName = result.resourceName;
                return newResource;
            }));

            setResources(newResources);
        }

        setupInitialResources();
    }, [initialResources]);

    function handleResources(){
        return(
            <>
                {resources.map((value, index) => 
                    <div className="row mt-3 justify-content-between" key={`${value.resourceName}-${index}`}>
                        <div className="col-4">{value.resourceName}</div>
                        <div className="col-4">{value.quantity}</div>
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