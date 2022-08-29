const API_URL = process.env.API_URL;

function getUserPhotos(userId) {
  const userPhotos = fetch(`${API_URL}/api/users/${userId}`, {
    method: "GET",
    headers: {
      "access-control-allow-origin": "*",
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then((response) => response.json());
  return userPhotos;
}
