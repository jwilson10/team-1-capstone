const RESOURCES_API_URL = `${process.env.REACT_APP_API_URL}/event`;

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

export async function findEventById(eventId){
    const init = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
    }

    const response = await fetch(`${RESOURCES_API_URL}/id/${eventId}`, init);
    if(response.ok) {
        return response.json();
    } else{
        return Promise.reject();
    }
}