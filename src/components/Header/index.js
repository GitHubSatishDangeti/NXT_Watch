import {withRouter, Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {BsFillBrightnessHighFill} from 'react-icons/bs'
import {FaMoon} from 'react-icons/fa'

import './index.css'
import Context from '../../Context/Context'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <Context.Consumer>
      {value => {
        const {darkTheme, changeTheme} = value
        const logo = darkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

        const onThemeClick = () => {
          changeTheme()
        }

        return (
          <nav
            className={`navbar ${
              darkTheme ? 'navbar-dark-bg' : 'navbar-light-bg'
            }`}
          >
            <Link to="/">
              <img src={logo} alt="website logo" width="150px" />
            </Link>

            <ul className="nav-options">
              <button
                onClick={onThemeClick}
                data-testid="theme"
                className="navbar-option theme-button"
                type="button"
              >
                {darkTheme ? (
                  <BsFillBrightnessHighFill color="white" size={22} />
                ) : (
                  <FaMoon size={22} />
                )}
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
      }}
    </Context.Consumer>
  )
}
export default withRouter(Header)
