import React from 'react'
import Message from './Message'
import { ChatStore, Events } from '../stores/ChatStore'
import io from 'socket.io-client'

var socket = io();

const Conversation = React.createClass({
  displayName: 'Conversation',

  getInitialState () {
    return {
      messages: [],
      messageBody: ''
    }
  },

  propTypes: {
    chat: React.PropTypes.object.isRequired
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.chat.room_id != nextProps.chat.room_id) {
      let roomId = nextProps.chat.room_id;
      this.setState({ messages: ChatStore.getMessagesForRoom(roomId) })
    }
  },

  componentWillMount () {
    ChatStore.subscribe(Events.UPDATE, this._updateMessages);
    this.setState({ messages: this.props.chat.messageList })
  },

  _updateMessages () {
    this.setState({ messages: ChatStore.getMessagesForRoom(this.props.chat.room_id) })
  },

  handleMessageChange (e) {
    this.setState({ messageBody: e.target.value })
  },

  sendMessage (e) {
    if (e.key === 'Enter') {
      var message = { body: this.state.messageBody, room_id: this.props.chat.room_id };
      ChatStore.sendMessage(message)
      this.setState({ messageBody: '' })
    }
  },

  // _listenForMessages () {
  //   socket.on('message', message => {
  //     this.setState({ messages: this.state.messages.concat([message]) })
  //   })
  // },

  render () {
    return (
      <div>
        <div className="message-list" style={{ minHeight: '500px', maxHeight: '500px', overflow: 'scroll', border: '1px solid black', borderRadius: '5px' }}>
          {this.state.messages.map(message => <Message key={Math.random()} message={message} />)}
        </div>
        <input className="form-control" placeholder="Say something..." style={{ height: '45px', marginTop: '10px' }} value={this.state.messageBody} onChange={this.handleMessageChange} onKeyPress={this.sendMessage} />  
      </div>
    )
  }
})

export default Conversation