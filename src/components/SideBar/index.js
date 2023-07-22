import {Link} from 'react-router-dom'
import {AiFillHome, AiOutlineMenuUnfold} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import './index.css'
import Context from '../../Context/Context'

const SideBar = () => (
  <Context.Consumer>
    {value => {
      const {darkTheme} = value

      return (
        <div
          className={`side-container ${
            darkTheme ? 'sidebar-dark-theme' : 'sidebar-light-theme'
          }`}
        >
          <div className="sidebar-top-section">
            <Link className="link" to="/">
              <div className="home-sidebar-links">
                <AiFillHome className="sidebar-links-icons" />
                <p>Home</p>
              </div>
            </Link>

            <Link to="/trending" className="link">
              <div className="home-sidebar-links">
                <HiFire className="sidebar-links-icons" />
                <p>Trending</p>
              </div>
            </Link>

            <Link to="/gaming" className="link">
              <div className="home-sidebar-links">
                <SiYoutubegaming className="sidebar-links-icons" />
                <p>Gaming</p>
              </div>
            </Link>

            <Link to="/saved-videos" className="link">
              <div className="home-sidebar-links">
                <AiOutlineMenuUnfold className="sidebar-links-icons" />
                <p>Saved videos</p>
              </div>
            </Link>
          </div>

          <div className="sidebar-bottom-section">
            <p>CONTACT US</p>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                width="30px"
                className="sidebar-social-media-links"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                width="30px"
                className="sidebar-social-media-links"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
                width="30px"
                className="sidebar-social-media-links"
              />
            </div>
            <p className="enjoy-para">
              Enjoy! Now to see your channels and recommendations!
            </p>
          </div>
        </div>
      )
    }}
  </Context.Consumer>
)

export default SideBar
