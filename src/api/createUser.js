const API_URL = process.env.REACT_APP_API_URL;

export async function createUser(data) {
    return await fetch(`${API_URL}/api/createUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}