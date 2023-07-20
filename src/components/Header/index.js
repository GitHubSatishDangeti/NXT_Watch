import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaMoon} from 'react-icons/fa'
import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
          width="150px"
        />
      </Link>
      <div className="nav-options">
        <button className="navbar-option" type="button">
          <FaMoon />
        </button>
        <img
          className="navbar-option"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          alt="profile"
          width="30px"
        />
        <button className="navbar-option" onClick={onLogout} type="button">
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
