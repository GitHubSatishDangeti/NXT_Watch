import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {FaMoon} from 'react-icons/fa'

import './index.css'

class Home extends Component {
  state = {searchInput: ''}

  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <div>
        <header>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="website logo"
            />
          </Link>
          <div>
            <button type="button">
              <FaMoon />
            </button>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
            />
            <button onClick={this.onLogout} type="button">
              Logout
            </button>
          </div>
        </header>
        <div>
          <div>
            <div>{}</div>
            <div>{}</div>
            <div>{}</div>
            <div>{}</div>
          </div>
          <div>{}</div>
        </div>
      </div>
    )
  }
}
export default Home
