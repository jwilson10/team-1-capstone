const GAME_API_URL = `${process.env.REACT_APP_API_URL}/game`;

//get all games for all users
export async function findAllForUser(){
    const init = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
    }

    const response = await fetch(`${GAME_API_URL}`, init)
    if(response.ok) {
        return response.json();
    } else{
        return Promise.reject();
    }
}

//get specific game

export async function findGame(gameId){
    const init = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
    }

    const url = `${GAME_API_URL}/${gameId}`;
    const response = await fetch(`${GAME_API_URL}/${gameId}`, init);
    if(response.ok) {
        return response.json();
    } else{
        return Promise.reject();
    }
}


//create game

export async function createGame(game){
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify(game)
    };

    const response = await fetch(`${GAME_API_URL}`, init);
    if(response.ok){
        return Promise.resolve();
    } else if(response.status === 400){
        const errs = await response.json();
        return Promise.reject(errs);
    } else{
        return Promise.reject();
    }
}


//update game

export async function updateGame(game){
    const init = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify(game)
    };

    const response = await fetch(`${GAME_API_URL}`, init)
    if(response.ok){
        return Promise.resolve();
    } else if(response.status === 400){
        const errs = await response.json();
        return Promise.reject(errs);
    } else{
        return Promise.reject();
    }
}


//delete game

export async function deleteGame(game){
    const init = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify(game)
    };

    const response = await fetch(`${GAME_API_URL}`, init);
    if(response.ok){
        return Promise.resolve();
    } else{
        return Promise.reject();
    }
}