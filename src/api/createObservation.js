const API_URL = process.env.REACT_APP_API_URL;

async function createObservation(data) {
    return await fetch(`${API_URL}/api/createObservation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
   })
}

module.exports = createObservation;