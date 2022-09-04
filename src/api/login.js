const API_URL = process.env.API_URL;

function login(email, password) {
  const users = fetch(`${API_URL}/api/login`, {
    method: "POST",
    body: JSON.stringify({
        email: this.state.idValue,
        password: this.state.pwValue
     }),
    headers: {
      "access-control-allow-origin": "*",
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then((response) => response.json())
    .then(console.log('logged in'));
    // .then((result) => {
    //     if(result. === “SUCCESS”){
    //       alert(“You are logged in.”);
    //       this.goToMain();
    //      } else {
    //          alert(“Please check your login information.”);
    //      }
  return users;
}
