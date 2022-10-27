const API_URL = "http://localhost:8080";


function makeUser(body) {
    const sections = body.jwt.split(".");
    //const json = atob(sections[1]); -- this was yelling at me because atob is old and suggested using the following. May change if problems arise.
    const json = Buffer.from(sections[1], 'base64');
    const user = JSON.parse(json);
    localStorage.setItem("jwt", body.jwt);
    return user;
}

export async function authenticate(user) {

    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(user)
    }

    const response = await fetch(`${API_URL}/authenticate`, init);
    if (response.ok) {
        const body = await response.json();
        return makeUser(body);
    } else {
        return Promise.reject();
    }
}

export async function refresh() {

    const init = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
    }

    const response = await fetch(`${API_URL}/refresh_token`, init);
    if (response.ok) {
        const body = await response.json();
        return makeUser(body);
    }

    return Promise.reject();
}

export async function create_account(){
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(user)
    }

    const response = await fetch(`${API_URL}/create_account`, init);
    if (response.ok) {
        const body = await response.json();
        return makeUser(body);
    } else {
        return Promise.reject();
    }
}