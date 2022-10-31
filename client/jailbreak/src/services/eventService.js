const RESOURCES_API_URL = "http://localhost:8080/event";

export async function findEventByName(eventName){
    const init = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
    }

    const response = await fetch(`${RESOURCES_API_URL}/${eventName}`, init);
    if(response.ok) {
        return response.json();
    } else{
        return Promise.reject();
    }
}