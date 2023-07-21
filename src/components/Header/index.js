import {withRouter, Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
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

      <ul className="nav-options">
        <button data-testid="theme" className="navbar-option" type="button">
          <FaMoon />
        </button>
        <img
          className="navbar-option"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          alt="profile"
          width="30px"
        />

        <div className="popup-container">
          <Popup
            modal
            trigger={
              <button
                className="navbar-option trigger-button"
                onClick={onLogout}
                type="button"
              >
                Logout
              </button>
            }
          >
            {close => (
              <>
                <div className="pop-up">
                  <p className="pop-up-para">
                    Are you sure, you want to logout
                  </p>

                  <button
                    type="button"
                    className="trigger-button"
                    onClick={() => close()}
                  >
                    Cancel
                  </button>

                  <button
                    onClick={onLogout}
                    className="trigger-button"
                    type="button"
                  >
                    Confirm
                  </button>
                </div>
              </>
            )}
          </Popup>
        </div>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
