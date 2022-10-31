const API_URL = process.env.REACT_APP_API_URL;

function getObservation(observationId) {
  return fetch(`${API_URL}/api/observation/${observationId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json; charset=UTF-8"
    }
  })  
}

module.exports = getObservation;
