const API_URL = process.env.REACT_APP_API_URL;

function getUserPhotos(userId) {
  const userPhotos = fetch(`${API_URL}/api/users/${userId}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then((response) => response.json());
  return userPhotos;
}
