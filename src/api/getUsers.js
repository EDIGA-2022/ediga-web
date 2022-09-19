const API_URL = process.env.REACT_APP_API_URL;

export async function getUsers() {
  const users = fetch(`${API_URL}/api/users`, {
    method: "GET",
    headers: {
      "access-control-allow-origin": "*",
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then((response) => response.json());
  return users;
}