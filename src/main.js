import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'

import Message from './components/Message'

let socket = io();


// { friend_id: 1, body: 'Hey!' },
// { friend_id: 2, body: 'Hey Friend 1!' },
// { friend_id: 1, body: 'Wassup!' },
// { friend_id: 2, body: 'Nothing Friend 1!' },


const App = React.createClass({
  displayName: 'App',

  componentDidMount() {
    socket.on('message', data => {
      console.log(data);
      this.state.messages.push(data)
      this.forceUpdate();
    })
  },

  getInitialState() {
    return {
      friend_id: Date.now(),
      messages: [],
      friends: [
        { id: 1, name: 'Anand' },
        { id: 2, name: 'Krishna' },
        { id: 3, name: 'Vignesh' },
        { id: 4, name: 'Karuna' },
        { id: 5, name: 'Amma' },
        { id: 6, name: 'Vignesh' },
      ]
    }
  },

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
    if (this.state.messages.length) {
      conversation = this.state.messages.map(renderConversation)
    } else {
      conversation = <h4 className="text-primary text-center">Start a conversation with Anand</h4>
    }

    return (
      <div className="row">
        <div className="col-sm-4">
          <ul className="list-group" style={{ minHeight: '500px', backgroundColor: '#e6e6e6', border: '1px solid #e3e3e3', borderRadius: '5px' }}>
            {this.state.friends.map(friend => <a className="list-group-item" key={friend.id}>{friend.name}</a>)}
          </ul>
        </div>
        <div className="col-sm-8">
          <div className="message-list" style={{ minHeight: '500px', border: '1px solid black', borderRadius: '5px' }}>
            {conversation}
          </div>
          <input className="form-control" placeholder="Say something..." style={{ height: '45px' }} onKeyPress={this.handleKeyPress} />  
        </div>
      </div>
    )
  }
})

ReactDOM.render(<App />, document.querySelector('#app'));

export default App