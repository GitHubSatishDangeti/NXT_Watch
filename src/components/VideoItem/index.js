import {Link} from 'react-router-dom'
import './index.css'

const VideoItem = props => {
  const {itemDetails} = props

  const {
    thumbnailUrl,
    channelName,
    publishedAt,
    channelProfileImage,
    title,
    viewCount,
    channelId,
  } = itemDetails
  const publishedDate = new Date(publishedAt)
  const yearsDifference = new Date().getFullYear() - publishedDate.getFullYear()

  return (
    <Link to={`/videos/${channelId}`}>
      <li>
        <div className="video-item-container">
          <img width="250px" src={thumbnailUrl} alt="thumbnail" />
          <div className="video-item-thumbnail-description">
            <img
              className="channel-image"
              width="50px"
              src={channelProfileImage}
              alt="channelProfileImage"
            />
            <div>
              <p className="video-title">{title}</p>
              <p>{channelName}</p>
              <p>{`${viewCount} views . ${yearsDifference} years ago`}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default VideoItem
