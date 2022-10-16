const API_URL = process.env.REACT_APP_API_URL;

export async function getUserProfile(userId) {
  const users = fetch(`${API_URL}/api/user/profile/${userId}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then((response) => response.json());
  return users;
}