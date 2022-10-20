const API_URL = process.env.REACT_APP_API_URL;

function createDiaryEntry(data) {
    return fetch(`${API_URL}/api/diaryEntry`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
   })
}

module.exports = createDiaryEntry;