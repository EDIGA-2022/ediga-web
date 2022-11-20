const API_URL = process.env.REACT_APP_API_URL;

export async function setAdminEdiga(userId, admin) {
  return fetch(`${API_URL}/api/setAdminEdiga`, {
    method: "POST",
    body: JSON.stringify({
      userId: userId,
      admin: admin
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    }
  })
};
