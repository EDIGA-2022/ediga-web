const API_URL = process.env.REACT_APP_API_URL;

export async function getUser(userId) {
  const users = fetch(`${API_URL}/api/user/${userId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then((response) => response.json());
  return users;
}