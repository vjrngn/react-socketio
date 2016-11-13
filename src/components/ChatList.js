import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'

const ChatList = React.createClass({
  displayName: 'ChatList',

  propTypes: {
    chats: React.PropTypes.array,
    onChatSelect: React.PropTypes.func
  },

  getInitialState() {
    return {
      chats: [],
      searchTerm: ''
    } 
  },
  
  showChatConversation (chat) {
    this.props.onChatSelect(chat);
  },

  filterFriendList (chat) {
    return `${chat.friend.name}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0
  },

  onSearchTermChange (e) {
    this.setState({ searchTerm: e.target.value })
  },

  render () {
    var renderChatItem = chatItem => {
      return (
        <a ref={'chat-' + chatItem.room_id} onClick={this.showChatConversation.bind(this, chatItem)} className='list-group-item' key={chatItem.friend.id}>
          {chatItem.friend.name}
        </a>
      )
    }

    return (
      <div>
        <input className="form-control" placeholder="Search" onChange={this.onSearchTermChange} value={this.state.searchTerm} />
        <br />
        <div className="list-group">
          {this.props.chats.filter(this.filterFriendList).map(renderChatItem)}
        </div>
      </div>
    )
  }
})

export default ChatList