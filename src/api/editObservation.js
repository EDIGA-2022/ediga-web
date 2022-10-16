const API_URL = process.env.REACT_APP_API_URL;

function editObservation(data) {

    return fetch(`${API_URL}/api/observation`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
   })
}

module.exports = editObservation;

