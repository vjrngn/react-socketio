import React from 'react'
import Welcome from './Welcome'
import ChatList from './ChatList'
import Conversation from './Conversation'
import ChatService from '../services/ChatService'

const Chattr = React.createClass({
  displayName: 'Chattr',

  componentDidMount() {
    this._initChats()
  },

  getInitialState () {
    return {
      chats: [],
      currentConversation: null
    }
  },

  showSelectedChat (chat) {
    this.setState({ currentConversation: chat });
  },

  _initChats () {
    ChatService.getAllChats().then(chats => this.setState({ chats: this.state.chats.concat(chats) }))
  },

  render () {
    let conversationPane = '';
    if (this.state.currentConversation) {
      conversationPane = <Conversation chat={this.state.currentConversation} />
    } else {
      conversationPane = <Welcome />
    }

    return (
      <div className="row">
        <div className="col-sm-4">
          <ChatList chats={this.state.chats} onChatSelect={this.showSelectedChat} />
        </div>
        <div className="col-sm-8">
          {conversationPane}
        </div>
      </div>
    )
  }
})

export default Chattr