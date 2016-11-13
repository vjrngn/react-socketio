import events from 'events';
import io from 'socket.io-client'

const socket = io();

const emitter = new events.EventEmitter();
const Events = { UPDATE: 'UPDATE' };

var messages = [];
fetch('/chatList').then(res => res.json()).then(msgs => messages = msgs)

socket.on('message', message => {
  var chat = MessageStore.getMessages(message.room_id)
  chat.messageList.push(message)
})

const MessageStore = {
  getMessage () {
    return messages.concat();
  },

  getMessagesForRoom (roomId) {
    return messages.find(message => message.room_id == roomId);
  },
  subscribe (callback) {
    emitter.addListener(Events.UPDATE, callback);
  },
  unsubscribe (callback) {
    emitter.removeListener(Events.UPDATE, callback);
  },
  sendMessage (message) {
    socket.emit('message', message)
    messages.push(message);
    emitter.emit(Events.UPDATE);
  }
}
window.ms = MessageStore;
export default MessageStore

