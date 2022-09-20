const API_URL = process.env.REACT_APP_API_URL;

function editUser(data) {

    return fetch(`${API_URL}/api/editUser`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
   })
}

module.exports = editUser;

