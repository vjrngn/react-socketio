/**
 * Chatstore is the central repository for all messages coming in
 * or going out of the application. This follows the Flux architecture pattern
 * where all chat state is centralized and state changes within the react components
 * happen via events that are dispatched from this store and listened for at the component level
 */

// If we're not using a service worker, this 
// is where we can store all messages in either localStorage
// or other storage mechanisms available in the browser. All we 
// will need to do is hook up listeners for when a message has been  
// sent and when a reply is received from the server. This makes it easy
// to reason about by keeping data reads and write consistent throughout the app.

import events from 'events';
import io from 'socket.io-client';
import ChatService from '../services/ChatService';

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

