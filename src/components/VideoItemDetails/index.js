import {Component} from 'react'
import Cookies from 'js-cookie'
import {
  AiTwotoneLike,
  AiTwotoneDislike,
  AiOutlineMenuUnfold,
  AiOutlineLike,
  AiOutlineDislike,
} from 'react-icons/ai'
// import {SiYoutubegaming} from 'react-icons/si'
import Header from '../Header'
import VideoPlayer from '../VideoPlayer'
import './index.css'
import SideBar from '../SideBar'

class videoItemDetails extends Component {
  state = {
    apiStatus: 'initial',
    data: '',
    id: '',
    likeIsActive: false,
    disLikeIsActive: false,
    isSaved: false,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({id}, this.getData)
  }

  getData = async () => {
    this.setState({apiStatus: 'loading'})
    const {id} = this.state
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const formattedData = {
        videoId: data.video_details.id,
        videoTitle: data.video_details.title,
        videoUrl: data.video_details.video_url,
        videoThumbnailUrl: data.video_details.thumbnail_url,
        channelName: data.video_details.channel.name,
        channelProfileImageUrl: data.video_details.channel.profile_image_url,
        subscriptionCount: data.video_details.channel.subscriber_count,
        videoViewCount: data.video_details.view_count,
        videoPublishedAt: data.video_details.published_at,
        videoDescription: data.video_details.description,
      }
      //   console.log(formattedData)

      this.setState({apiStatus: 'success', data: formattedData})
    } else {
      this.setState({apiStatus: 'failure'})
    }
  }

  onLike = () => {
    this.setState({
      likeIsActive: true,
      disLikeIsActive: false,
    })
  }

  onDisLike = () => {
    this.setState({
      disLikeIsActive: true,
      likeIsActive: false,
    })
  }

  render() {
    const {data, disLikeIsActive, isSaved, likeIsActive} = this.state
    const {
      videoId,
      videoTitle,
      videoUrl,
      videoThumbnailUrl,
      videoDescription,
      channelName,
      channelProfileImageUrl,
      subscriptionCount,
      videoViewCount,
      videoPublishedAt,
    } = data

    const publishedDate = new Date(videoPublishedAt)
    const yearsDifference =
      new Date().getFullYear() - publishedDate.getFullYear()
    // const {videoUrl} = data
    return (
      <div>
        <Header />
        <div className="video-container-route">
          <SideBar />
          <div className="video-route-container">
            <VideoPlayer data={data} />
            <p>{videoTitle}</p>
            <div className="description-section">
              <p>{`${videoViewCount} views . ${yearsDifference} years ago`}</p>
              <div className="icons-container">
                <div className="home-sidebar-links-video-route">
                  <button
                    id="like"
                    className="like-dislike-button"
                    onClick={this.onLike}
                    type="button"
                  >
                    {likeIsActive ? (
                      <AiTwotoneLike
                        className="sidebar-links-icons"
                        size={20}
                      />
                    ) : (
                      <AiOutlineLike
                        className="sidebar-links-icons"
                        size={20}
                      />
                    )}
                  </button>
                  <label htmlFor="like">Like</label>
                </div>
                <div className="home-sidebar-links-video-route">
                  <button
                    id="dislike"
                    className="like-dislike-button"
                    onClick={this.onDisLike}
                    type="button"
                  >
                    {disLikeIsActive ? (
                      <AiTwotoneDislike
                        className="sidebar-links-icons"
                        size={20}
                      />
                    ) : (
                      <AiOutlineDislike
                        className="sidebar-links-icons"
                        size={20}
                      />
                    )}
                  </button>
                  <label htmlFor="dislike">Dislike</label>
                </div>
                <div className="home-sidebar-links-video-route">
                  <AiOutlineMenuUnfold className="sidebar-links-icons" />
                  <p>Save</p>
                </div>
              </div>
            </div>
            <hr />

            <div className="video-bottom-section">
              <img
                className="channel-image"
                width="50px"
                src={channelProfileImageUrl}
                alt="channelProfileImage"
              />
              <div>
                <p className="video-title">{channelName}</p>
                <p>{subscriptionCount} subscribers</p>
                <p>{videoDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default videoItemDetails
