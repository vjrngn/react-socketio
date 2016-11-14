import React from 'react';
import { Card, CardTitle } from 'material-ui/card';

const Welcome = React.createClass({
  displayName: 'Welcome',

  render () {
    return (
      <Card>
        <div className="text-center">
          <CardTitle title="Welcome to chattr!" />
        </div>
      </Card>
    )
  }
})

export default Welcome