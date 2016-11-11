import React from 'react'
import ReactDOM from 'react-dom'
import Welcome from './components/Welcome'
import ChatList from './components/ChatList'
import Conversation from './components/Conversation'

const App = React.createClass({
  displayName: 'App',

  componentDidMount() {
    fetch('/chatList').then(response => {
      return response.json()
    }).then(chats => {
      this.setState({ chats })
    })
  },

  getInitialState() {
    return {
      chats: [],
      currentConversation: null
    }
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

ReactDOM.render(<App />, document.querySelector('#app'));

export default App