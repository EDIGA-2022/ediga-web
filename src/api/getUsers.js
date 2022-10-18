const API_URL = process.env.REACT_APP_API_URL;

export async function getUsers() {
  return fetch(`${API_URL}/api/users`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json; charset=UTF-8"
    }
  })
};
