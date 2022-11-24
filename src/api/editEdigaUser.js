const API_URL = process.env.REACT_APP_API_URL;

function editEdigaUser(userId, name, email, isAdmin) {
  return fetch(`${API_URL}/api/editEdigaUser`, {
    method: 'POST',
    body: JSON.stringify({
      userId: userId,
      name: name,
      email: email,
      isAdmin: isAdmin,
    }),
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json; charset=UTF-8"
    },
  })
}

module.exports = editEdigaUser;

