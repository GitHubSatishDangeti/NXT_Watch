import {Link} from 'react-router-dom'
import './index.css'

const GamingVideoItem = props => {
  const {itemDetails} = props
  const {channelId, title, thumbnailUrl, viewCount} = itemDetails

  return (
    <Link className="link" to={`/videos/${channelId}`}>
      <li className="video-item-list">
        <div className="gaming-video-container">
          <img className="img" width="200px" src={thumbnailUrl} alt="item" />
          <div>
            <h4>{title}</h4>
            <p>{viewCount} Watching Worldwide</p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default GamingVideoItem
