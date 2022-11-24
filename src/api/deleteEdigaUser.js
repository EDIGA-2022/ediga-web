const API_URL = process.env.REACT_APP_API_URL;

export function deleteEdigaUser(userId) {
    return fetch(`${API_URL}/api/deleteEdigaUser`, {
    method: 'DELETE',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({
      userId: userId,
    }),
   })
}



