const API_URL = process.env.REACT_APP_API_URL;

function register(name, email, password, isAdmin, country) {
  return fetch(`${API_URL}/api/register`, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
      isAdmin: isAdmin,
      country: country
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    }
  });
}

module.exports = register;