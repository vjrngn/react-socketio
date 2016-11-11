import React from 'react'
import Message from './Message'
import io from 'socket.io-client'

const socket = io();

const Conversation = React.createClass({
  displayName: 'Conversation',

  handleKeyPress (e) {
    if (e.key === 'Enter') {
      socket.emit('message', {
        friend_id: this.state.friend_id,
        body: e.target.value
      })
      e.target.value = '';
    }
  },

  render () {
    let renderConversation = message => <Message message={message} />

    let conversation = '';
    if (this.props.messages.length) {
      conversation = this.props.messages.map(renderConversation)
    } else {
      conversation = <h4 className="text-primary text-center">Start a conversation with Anand</h4>
    }

    return (
        <div>
          <div className="message-list" style={{ minHeight: '500px', border: '1px solid black', borderRadius: '5px' }}>
            {conversation}
          </div>
          <input className="form-control" placeholder="Say something..." style={{ height: '45px' }} onKeyPress={this.handleKeyPress} />  
        </div>
      )
  }
})

export default Conversation