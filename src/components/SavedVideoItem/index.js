import {Link} from 'react-router-dom'
import './index.css'

const SavedVideoItem = props => {
  const {itemDetails} = props

  const {
    videoId,
    videoTitle,
    videoThumbnailUrl,
    channelName,
    videoViewCount,
    videoPublishedAt,
    saved,
  } = itemDetails

  const publishedDate = new Date(videoPublishedAt)
  const yearsDifference = new Date().getFullYear() - publishedDate.getFullYear()

  return (
    <Link to={`/videos/${videoId}`}>
      <li className="video-item-list">
        <div className="trending-video-container">
          <img
            className="img"
            width="450px"
            height="300px"
            src={videoThumbnailUrl}
            alt="video thumbnail"
          />
          <div>
            <p>{videoTitle}</p>
            <p>{channelName}</p>
            <p>{`${videoViewCount} views . ${yearsDifference} years ago`}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default SavedVideoItem
