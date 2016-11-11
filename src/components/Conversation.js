import React from 'react'
import Message from './Message'
import io from 'socket.io-client'
var socket = io();

const Conversation = React.createClass({
  displayName: 'Conversation',

  propTypes: {
    chat: React.PropTypes.object.isRequired
  },

  componentDidMount () {
    this._listenForMessages()
  },

  componentWillReceiveProps(nextProps) {
    this.setState({ messages: nextProps.chat.messageList })
  },

  getInitialState() {
    return {
      messages: []
    }
  },

  handleKeyPress (e) {
    if (e.key === 'Enter') {
      socket.emit('message', { body: e.target.value, chat_id: this.props.chat.id })
      e.target.value = ''
    }
  },

  _listenForMessages () {
    socket.on('message', message => {
      if (this.props.chat.id == message.chat_id) {
        this.state.messages.push(message);
        this.forceUpdate()
      }
    })
  },

  render () {
    return (
      <div>
        <div className="message-list" style={{ minHeight: '500px', maxHeight: '500px', overflow: 'scroll', border: '1px solid black', borderRadius: '5px' }}>
          {this.state.messages.map(message => <Message message={message} />)}
        </div>
        <input className="form-control" placeholder="Say something..." style={{ height: '45px', marginTop: '10px' }} onKeyPress={this.handleKeyPress} />  
      </div>
    )
  }
})

export default Conversation