import React from 'react'
import Message from './Message'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

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
      var message = { body: this.state.messageBody, room_id: this.props.chat.room_id, friend: { id: 1, name: 'Vijay Rangan' } };
      ChatStore.sendMessage(message)
      this.setState({ messageBody: '' })
    }
  },

  render () {
    if (!this.state.messages.length) {
      var emptyConversation = <h4 className="text-center text-success">New conversation</h4>
    }
    let composeBoxStyles = { height: '45px', marginTop: '10px', borderRadius: '0', border: '1px solid #e6e6e6', boxShadow: 'none', borderTop: '1px solid #e6e6e6' }
    
    return (
      <Card>
        <CardHeader 
          title={this.props.chat.friend.name}
          subtitle="Last seen 2 hours ago"
          avatar="http://loremflickr.com/320/240"
        />
        {emptyConversation}
        <CardText>
          {this.state.messages.map(message => <Message key={Math.random()} message={message} />)}
        </CardText>
        <input className="form-control" placeholder="Say something..." style={composeBoxStyles} value={this.state.messageBody} onChange={this.handleMessageChange} onKeyPress={this.sendMessage} />
      </Card>
    )
  }
})

export default Conversation