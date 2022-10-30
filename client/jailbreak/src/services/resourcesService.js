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
    const init = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
    }

    const response = await fetch(`${RESOURCES_API_URL}/name/${resourceName}`, init);
    if(response.ok) {
        return response.json();
    } else{
        return Promise.reject();
    }
}