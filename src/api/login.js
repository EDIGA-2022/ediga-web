const API_URL = process.env.REACT_APP_API_URL;

function login(email, password) {
  return fetch(`${API_URL}/api/login`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password
    }),
    headers: {
      "access-control-allow-origin": "*",
      "Content-type": "application/json; charset=UTF-8"
    }
  });
}

module.exports = login;