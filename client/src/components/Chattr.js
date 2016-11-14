import React from 'react';
import Welcome from './Welcome';
import ChatList from './ChatList';
import { Card } from 'material-ui/card';
import Conversation from './Conversation';
import { Events, ChatStore } from '../stores/ChatStore';

const Chattr = React.createClass({
  displayName: 'Chattr',

  componentDidMount() {
    ChatStore.init()
    ChatStore.subscribe(Events.INITIALISED, this._updateChatList)
  },

  componentWillUnmount() {
    ChatStore.unsubscribe(Events.INITIALISED, this._updateChatList);
  },

  getInitialState () {
    return {
      chats: [],
      currentConversation: null
    }
  },

  _updateChatList (chatList) {
    this.setState({ chats: ChatStore.getChatList() })
  },

  showSelectedChat (chat) {
    this.setState({ currentConversation: chat });
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