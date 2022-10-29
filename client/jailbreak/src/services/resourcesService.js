const RESOURCES_API_URL = "http://localhost:8080/resources";

//Get mapping
export async function findResourcesById(resourcesId){
    const init = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
    }

    const response = await fetch(`${RESOURCES_API_URL}/${resourcesId}`, init);
    if(response.ok) {
        return response.json();
    } else{
        return Promise.reject();
    }
}

export async function findResourcesByName(resourceName){
    switch(resourceName){
        case "cheese":
            return {
                resourceId: 1,
                resourceName: "cheese",
                resourceValue: 1,
                resourceDefaultIncRate: 1
            };
        case "yogies":
            return {
                resourceId: 2,
                resourceName: "yogies",
                resourceValue: 2,
                resourceDefaultIncRate: 1
            };
        default:
            return undefined;
    }
}