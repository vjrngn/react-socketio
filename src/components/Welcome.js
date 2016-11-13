import React from 'react'
import { Card, CardTitle } from 'material-ui/card';

const Welcome = React.createClass({
  displayName: 'Welcome',

  render () {
    return (
        <Card>
          <CardTitle className="text-primary" title="Welcome to chattr!" />
        </Card>
    )
  }
})

export default Welcome