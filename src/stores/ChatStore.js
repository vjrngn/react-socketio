import events from 'events';
import socket from './socketConnection'
import ChatService from '../services/ChatService'

const emitter = new events.EventEmitter;
const Events = { 
  INITIALISED: 'INITIALISED', 
  UPDATE: 'UPDATE' 
};

var chatList = [];
const ChatStore = {
  init () {
    ChatService.getAllChats().then(chats => {
      chatList = chats
    }).then(() => {
      emitter.emit(Events.INITIALISED)
    });
    socket.on('message', message => {
      this.getMessagesForRoom (message.room_id).push(message);
      emitter.emit(Events.UPDATE)
    })
  },

  getChatList () {
    return chatList.concat();
  },

  getMessagesForRoom (roomId) {
    let chatRoom = chatList.find(chat => chat.room_id == roomId);

    return chatRoom.messageList;
  },

  subscribe (eventName, callback) {
    emitter.addListener(eventName, callback);
  },

  unsubscribe (eventName, callback) {
    emitter.removeListener(eventName, callback);
  },

  sendMessage (message) {
    socket.emit('message', message)
    this.getMessagesForRoom (message.room_id).push(message);
    emitter.emit(Events.UPDATE);
  }
}
window.cs = ChatStore;
export { ChatStore, Events };

