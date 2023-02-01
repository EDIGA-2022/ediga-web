const API_URL = process.env.REACT_APP_API_URL;

function deleteUser(userId) {
  return fetch(`${API_URL}/api/user/${userId}`, {
    method: 'DELETE',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    },
  })
}

module.exports = deleteUser;