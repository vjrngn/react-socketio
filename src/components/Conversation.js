import React from 'react'
import Message from './Message'
import MessageStore from '../stores/MessageStore'
import io from 'socket.io-client'

var socket = io();

const Conversation = React.createClass({
  displayName: 'Conversation',

  getInitialState () {
    return {
      messages: []
    }
  },

  propTypes: {
    chat: React.PropTypes.object.isRequired
  },

  componentDidMount () {
    this._listenForMessages()
  },

  _updateMessages () {
    this.setState({ messages: MessageStore.getMessages(this.props.chat.room_id) })
  },

  sendMessage (e) {
    var message = { body: e.target.value, room_id: this.props.chat.room_id };
    if (e.key === 'Enter') {
      socket.emit('message', message);
      e.target.value = ''
    }
  },

  _listenForMessages () {
    socket.on('message', message => {
      this.setState({ messages: this.state.messages.concat([message]) })
    })
  },

  render () {
    return (
      <div>
        <div className="message-list" style={{ minHeight: '500px', maxHeight: '500px', overflow: 'scroll', border: '1px solid black', borderRadius: '5px' }}>
          {this.props.chat.messageList.map(message => <Message key={Math.random()} message={message} />)}
        </div>
        <input className="form-control" placeholder="Say something..." style={{ height: '45px', marginTop: '10px' }} onKeyPress={this.sendMessage} />  
      </div>
    )
  }
})

export default Conversation