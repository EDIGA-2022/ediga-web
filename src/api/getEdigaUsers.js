const API_URL = process.env.REACT_APP_API_URL;

export async function getEdigaUsers() {
  return fetch(`${API_URL}/api/edigaUsers`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json; charset=UTF-8"
    }
  })
};
