const API_URL = process.env.REACT_APP_API_URL;

function getUserProfile(userId) {
  return fetch(`${API_URL}/api/user/profile/${userId}`, {
    method: "GET",
    headers: {
      "access-control-allow-origin": "*",
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  // .then((response) => response.json());
  // return users;
}

module.exports = getUserProfile;