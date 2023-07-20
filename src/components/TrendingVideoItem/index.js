import {Link} from 'react-router-dom'
import './index.css'

const TrendingVideoItem = props => {
  const {itemDetails} = props
  const {
    channelId,
    title,
    thumbnailUrl,
    channelName,
    // channelProfileImage,
    viewCount,
    publishedAt,
  } = itemDetails

  const publishedDate = new Date(publishedAt)
  const yearsDifference = new Date().getFullYear() - publishedDate.getFullYear()

  return (
    <Link to={`/videos/${channelId}`}>
      <li className="video-item-list">
        <div className="trending-video-container">
          <img className="img" width="450px" src={thumbnailUrl} alt="item" />
          <div>
            <h2>{title}</h2>
            <p>{channelName}</p>
            <p>{`${viewCount} views ${yearsDifference} years ago`}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default TrendingVideoItem
