const API_URL = process.env.REACT_APP_API_URL;

function getUserPhotos(userId) {
  const userPhotos = fetch(`${API_URL}/api/users/${userId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    },
  })
    .then((response) => response.json());
  return userPhotos;
}
