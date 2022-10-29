const INVENTORY_API_URL = "http://localhost:8080/inventory";

//Post mapping
export async function createInventorySlot(slot){
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify(slot)
    };

    const response = await fetch(`${INVENTORY_API_URL}`, init);
    if(response.ok){
        return Promise.resolve();
    } else if(response.status === 400){
        const errs = await response.json();
        return Promise.reject(errs);
    } else{
        return Promise.reject();
    }
}

//Put mapping
export async function updateInventorySlot(slot){
    const init = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify(slot)
    };

    const response = await fetch(`${INVENTORY_API_URL}`, init);
    if(response.ok){
        return Promise.resolve();
    } else if(response.status === 400){
        const errs = await response.json();
        return Promise.reject(errs);
    } else{
        return Promise.reject();
    }
}
