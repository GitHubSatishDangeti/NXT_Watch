import {Link} from 'react-router-dom'
import {AiFillHome, AiOutlineMenuUnfold} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import './index.css'

const SideBar = () => (
  <div className="side-container">
    <Link to="/">
      <div className="home-sidebar-links">
        <AiFillHome className="sidebar-links-icons" />
        <p>Home</p>
      </div>
    </Link>
    <Link to="/trending">
      <div className="home-sidebar-links">
        <HiFire className="sidebar-links-icons" />
        <p>Trending</p>
      </div>
    </Link>
    <Link to="/gaming">
      <div className="home-sidebar-links">
        <SiYoutubegaming className="sidebar-links-icons" />
        <p>Gaming</p>
      </div>
    </Link>
    <Link to="saved-videos">
      <div className="home-sidebar-links">
        <AiOutlineMenuUnfold className="sidebar-links-icons" />
        <p>Saved videos</p>
      </div>
    </Link>
  </div>
)

export default SideBar
