const API_URL = process.env.API_URL;

export async function getUser(userId) {
  const users = fetch(`${API_URL}/api/user/7a7d8d2b-9a89-4bee-823f-f07b2b50383d`, {
    method: "GET",
    headers: {
      "access-control-allow-origin": "*",
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then((response) => response.json());
  return users;
}