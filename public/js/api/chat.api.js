
const URL = "/api/v1/chat";
const HEADERS = {
    "Content-Type": "application/json"
}


const askSynapse = async (prompt) => {
    const response = await fetch(URL, 
        { 
            method: "POST", 
            headers: HEADERS, 
            body: JSON.stringify({ prompt })
        });

    const data = await response.json();
    
    return data;
}

export { askSynapse };