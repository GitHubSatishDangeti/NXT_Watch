import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import VideoItemDetails from './components/VideoItemDetails'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import Saved from './components/Saved'
import Context from './Context/Context'
import NotFound from './components/NotFound'

class App extends Component {
  state = {savedVideoList: [], darkTheme: false}

  addVideo = video => {
    const {savedVideoList} = this.state
    const result = savedVideoList.find(i => i.videoId === video.videoId)
    if (result) {
      this.setState(prev => ({savedVideoList: [...prev.savedVideoList]}))
    } else {
      this.setState(prev => ({savedVideoList: [...prev.savedVideoList, video]}))
    }
  }

  removeVideo = videoId => {
    const {savedVideoList} = this.state
    const newList = savedVideoList.filter(i => i.videoId !== videoId)
    this.setState({savedVideoList: newList})
  }

  changeTheme = () => {
    this.setState(prev => ({darkTheme: !prev.darkTheme}))
  }

  render() {
    const {savedVideoList, darkTheme} = this.state
    console.log(savedVideoList)
    return (
      <Context.Provider
        value={{
          savedVideoList,
          darkTheme,
          addVideo: this.addVideo,
          removeVideo: this.removeVideo,
          changeTheme: this.changeTheme,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={Saved} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </Context.Provider>
    )
  }
}

export default App
