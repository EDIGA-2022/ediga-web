const API_URL = process.env.REACT_APP_API_URL;

function getUserProfile(userId) {
  return fetch(`${API_URL}/api/user/profile/${userId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    },
  })
  // .then((response) => response.json());
  // return users;
}

module.exports = getUserProfile;