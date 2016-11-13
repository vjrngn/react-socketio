import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'

import { Card } from 'material-ui/card';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';

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
        <ListItem
          key={chatItem.friend.id} 
          primaryText={chatItem.friend.name}
          leftAvatar={<Avatar src="http://loremflickr.com/320/240" />}
          onClick={this.showChatConversation.bind(this, chatItem)}
        />
      )
    }

    return (
      <Card>
        <List>
          <Subheader>Recent chats</Subheader>
          {this.props.chats.filter(this.filterFriendList).map(renderChatItem)}
        </List>
      </Card>
    )
  }
})

export default ChatList