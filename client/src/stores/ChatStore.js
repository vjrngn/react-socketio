import events from 'events';
import io from 'socket.io-client'
import ChatService from '../services/ChatService'

const socket = io();
const emitter = new events.EventEmitter;
const Events = { 
  INITIALISED: 'INITIALISED', 
  UPDATE: 'UPDATE' 
};

let chatList = [];
let fetchChatHistory = () => {
  ChatService.getAllChats().then(chats => {
      chatList = chats
    }).then(() => {
      emitter.emit(Events.INITIALISED)
    });
};
const ChatStore = {
  init () {
    fetchChatHistory();
    socket.on('reply', message => {
      this.getMessagesForRoom(message.room_id).push(message);
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
    this.getMessagesForRoom(message.room_id).push(message);
    emitter.emit(Events.UPDATE);
  }
}

export { ChatStore, Events };

