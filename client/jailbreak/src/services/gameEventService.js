const GAME_EVENT_API_URL = "http://localhost:8080/game/event";

export async function findGameEvent(gameEventId){
    const init = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
    }

    const url = `${GAME_EVENT_API_URL}/${gameEventId}`;
    const response = await fetch(`${GAME_EVENT_API_URL}/${gameEventId}`, init);
    if(response.ok) {
        return response.json();
    } else{
        return Promise.reject();
    }
}

export async function createGameEvent(gameEvent){
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify(gameEvent)
    };

    const response = await fetch(`${GAME_EVENT_API_URL}`, init);
    if(response.ok){
        return Promise.resolve();
    } 
    // else if(response.status === 400){
    //     const errs = await response.json();
    //     return Promise.reject(errs);
    // } 
    else{
        return Promise.reject();
    }
}
