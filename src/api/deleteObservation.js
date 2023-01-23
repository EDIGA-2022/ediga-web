const API_URL = process.env.REACT_APP_API_URL;

function deleteObservation(observationId) {
  return fetch(`${API_URL}/api/observation/${observationId}`, {
    method: 'DELETE',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    },
  })
}

module.exports = deleteObservation;
