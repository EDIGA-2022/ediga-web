const API_URL = process.env.REACT_APP_API_URL;

function editDiaryEntry(data) {
    return fetch(`${API_URL}/api/diaryEntry`, {
    method: 'PUT',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
   })
}

module.exports = editDiaryEntry;