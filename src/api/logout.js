const API_URL = process.env.REACT_APP_API_URL;

function logout() {
  return fetch(`${API_URL}/api/logout`, {
    credentials: 'include',
    method: "POST",
    headers: {
      "access-control-allow-origin": "*",
      "Content-type": "application/json; charset=UTF-8"
    }
  });
}

module.exports = logout;