import React from 'react';
import Welcome from './Welcome';
import ChatList from './ChatList';
import { Card } from 'material-ui/card';
import Conversation from './Conversation';
import { Events, ChatStore } from '../stores/ChatStore';

const Chattr = React.createClass({
  displayName: 'Chattr',

  componentDidMount() {
    ChatStore.init();
    ChatStore.subscribe(Events.INITIALISED, this._updateChatList);
    window.addEventListener('online', this._updateNetworkStatus);
    window.addEventListener('offline', this._updateNetworkStatus);
  },

  componentWillUnmount() {
    ChatStore.unsubscribe(Events.INITIALISED, this._updateChatList);
    window.removeEventListener('online', this._updateNetworkStatus);
    window.removeEventListener('offline', this._updateNetworkStatus);
  },

  getInitialState () {
    return {
      chats: [],
      currentConversation: null,
      offline: false
    }
  },

  _updateChatList (chatList) {
    this.setState({ chats: ChatStore.getChatList() })
  },

  _updateNetworkStatus (e) {
    if (e.type == 'offline') {
      this.setState({ offline: true })      
    } else if (e.type == 'online') {
      this.setState({ offline: false })
    }
  },

  showSelectedChat (chat) {
    this.setState({ currentConversation: chat });
  },

  render () {
    let networkStatus = '';
    if (this.state.offline) {
      networkStatus = (
        <div className="alert alert-info" style={{ position: 'absolute', bottom: '15px', right: '20px', zIndex: 1000 }}>
          <strong>Uh oh!</strong> You seem to be offline. You will not be able to send or receive messages while offline.
        </div>
      )
    }
    let conversationPane = '';
    if (this.state.currentConversation) {
      conversationPane = <Conversation chat={this.state.currentConversation} />
    } else {
      conversationPane = <Welcome />
    }

    return (
      <div className="row">
        {networkStatus}
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