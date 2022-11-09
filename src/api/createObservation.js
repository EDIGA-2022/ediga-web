const API_URL = process.env.REACT_APP_API_URL;

function createObservation(data) {
    return fetch(`${API_URL}/api/observations/${data.userId}`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
   })
}

module.exports = createObservation;