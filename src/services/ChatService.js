export default {
  getAllChats () {
    return fetch('/chatList').then(response => {
      return response.json()
    }).then(chats => {
      return chats;
    }).catch(err => console.log(err));
  }
}