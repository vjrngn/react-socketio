import React from 'react'

const ChatList = React.createClass({
  displayName: 'ChatList',

  propTypes: {
    chats: React.PropTypes.array
  },
  
  showChatConversation (chat) {
    this.props.onChatSelect(chat);
  },

  render () {
    var renderChatItem = chatItem => {
      return (
        <a onClick={this.showChatConversation.bind(this, chatItem)} className="list-group-item" key={chatItem.friend.id}>
          {chatItem.friend.name}
        </a>
      )
    }

    return (
      <div>
        <div className="list-group">
          {this.props.chats.map(renderChatItem)}
        </div>
      </div>
    )
  }
})

export default ChatList