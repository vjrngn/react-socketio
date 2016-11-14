import React from 'react'
import ReactDOM from 'react-dom'
import Chattr from './components/Chattr'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = React.createClass({
  displayName: 'App',

  render () {
    return (
      <MuiThemeProvider>
        <Chattr />
      </MuiThemeProvider>
    )
  }
})

ReactDOM.render(<App />, document.querySelector('#app'));