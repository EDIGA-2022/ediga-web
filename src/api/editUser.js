const API_URL = process.env.API_URL;

export async function editUser(userId, data) {
  return await fetch(`${API_URL}/api/editUser/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
   }).then((response) => response.json());
}