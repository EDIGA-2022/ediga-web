const API_URL = process.env.REACT_APP_API_URL;

function getDiaryEntry(entryId) {
  return fetch(`${API_URL}/api/diaryEntry/${entryId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json; charset=UTF-8"
    }
  })  
}

module.exports = getDiaryEntry;
