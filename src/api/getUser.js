const API_URL = process.env.API_URL;

export async function getUser(userId) {
  const users = fetch(`${API_URL}/api/user/${userId}`, {
    method: "GET",
    headers: {
      "access-control-allow-origin": "*",
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then((response) => response.json());
  return users;
}
