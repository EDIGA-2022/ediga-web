const API_URL = process.env.REACT_APP_API_URL;

export async function getUserDiaryEntries(userId) {
  return fetch(`${API_URL}/api/diaryEntry/user/${userId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json; charset=UTF-8"
    }
  })  
}
