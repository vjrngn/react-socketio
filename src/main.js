import React from 'react'
import ReactDOM from 'react-dom'
import Chattr from './components/Chattr'

const App = React.createClass({
  displayName: 'App',

  render () {
    return <Chattr />
  }
})

ReactDOM.render(<App />, document.querySelector('#app'));

export default App