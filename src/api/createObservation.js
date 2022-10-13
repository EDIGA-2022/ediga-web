const API_URL = process.env.REACT_APP_API_URL;

function createObservation(data) {
    return fetch(`${API_URL}/api/createObservation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
   })
}

module.exports = createObservation;