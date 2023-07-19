import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Home from './components/Home'

class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
        </Switch>
      </>
    )
  }
}

export default App
