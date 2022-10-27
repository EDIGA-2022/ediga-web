const API_URL = process.env.REACT_APP_API_URL;

function setPassword(password) {
  return fetch(`${API_URL}/api/password-reset`, {
    method: "POST",
    body: JSON.stringify({
      password: password
    }),
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json; charset=UTF-8"
    }
  });
}

module.exports = setPassword;