import React from 'react';

const Message = React.createClass({
  displayName: 'Message',

  propTypes: {
    message: React.PropTypes.object.isRequired
  },

  render () {
    return (
        <div className="panel panel-default" style={{ margin: '20px 20px 0 20px' }}>
          <div className="panel-body">
            {this.props.message.body} <span className="pull-right text-muted">{this.props.message.friend.name}</span>
          </div>
        </div>
    )
  }
})

export default Message