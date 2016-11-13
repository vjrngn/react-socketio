import events from 'events';
import socket from './socketConnection';
import * as ChatStore from './ChatStore';

const chatEvents = ChatStore.Events;
const chatStore = ChatStore.ChatStore;
const emitter = new events.EventEmitter();

var messages = [];
socket.on('message', message => {
  messages.push(message)
  emitter.emit('update')
})
const MessageStore = {

  init () {
    fetch('/chatList').then(res => res.json()).then(chat => {
      messages = chat
    }).then(() => emitter.emit('update'));
  },

  getMessages (roomId) {
    console.log(messages.find);
    return messages.find(message => message.room_id == roomId);
  },

  subscribe (eventName, callback) {
    emitter.addListener(eventName, callback);
  },

  unsubscribe (eventName, callback) {
    emitter.removeListener(eventName, callback);
  }
}

const Events = {
  UPDATE: 'UPDATE'
}

window.ms = MessageStore
export default MessageStore;