const API_URL = process.env.REACT_APP_API_URL;

function createUser(data) {
    return fetch(`${API_URL}/api/createUser`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
   })
}

module.exports = createUser;