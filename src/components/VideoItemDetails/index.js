import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
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
import Context from '../../Context/Context'

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
    // this.checkVideoInSavedList()
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
    this.setState(prev => ({
      likeIsActive: !prev.likeIsActive,
      disLikeIsActive: false,
    }))
  }

  onDisLike = () => {
    this.setState(prev => ({
      disLikeIsActive: !prev.disLikeIsActive,
      likeIsActive: false,
    }))
  }

  render() {
    // const {videoUrl} = data

    return (
      <Context.Consumer>
        {value => {
          const {savedVideoList, addVideo, removeVideo} = value

          const {
            apiStatus,
            data,
            disLikeIsActive,
            isSaved,
            likeIsActive,
          } = this.state

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
            saved,
          } = data

          const publishedDate = new Date(videoPublishedAt)
          const yearsDifference =
            new Date().getFullYear() - publishedDate.getFullYear()

          const removeOrAdd = () => {
            if (isSaved === true) {
              removeVideo(videoId)
            } else {
              addVideo({...data, saved: true})
            }
          }

          const onSaved = () => {
            this.setState(prev => ({isSaved: !prev.isSaved}))
            removeOrAdd()
          }

          const renderLoadingView = () => (
            <div className="loader-container align" data-testid="loader">
              <Loader type="ThreeDots" color="green" height="50" width="50" />
            </div>
          )

          const onRetry = () => {
            this.getVideoDetails()
          }

          const renderFailureView = () => (
            <div className="videoItem-failure-view">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
                alt="failure view"
                width="250px"
              />
              <h1>Oops! Something Went Wrong</h1>
              <p>
                We are having some trouble to complete your request. Please try
                again.
              </p>
              <button onClick={onRetry} type="button">
                Retry
              </button>
            </div>
          )

          const renderVideos = () => (
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
                          className="sidebar-links-icons activeColor"
                          size={20}
                        />
                      ) : (
                        <AiOutlineLike
                          className="sidebar-links-icons inactiveColor"
                          size={20}
                        />
                      )}
                      Like
                    </button>
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
                          className="sidebar-links-icons activeColor"
                          size={20}
                        />
                      ) : (
                        <AiOutlineDislike
                          className="sidebar-links-icons inactiveColor"
                          size={20}
                        />
                      )}
                      Dislike
                    </button>
                  </div>
                  <div className="home-sidebar-links-video-route">
                    <button
                      onClick={onSaved}
                      className="like-dislike-button"
                      type="button"
                    >
                      <AiOutlineMenuUnfold className="sidebar-links-icons" />
                      {isSaved ? 'Saved' : 'Save'}
                    </button>
                  </div>
                </div>
              </div>
              <hr />

              <div className="video-bottom-section">
                <img
                  className="channel-image"
                  width="50px"
                  src={channelProfileImageUrl}
                  alt="channel logo"
                />
                <div>
                  <p className="video-title">{channelName}</p>
                  <p>{subscriptionCount} subscribers</p>
                  <p>{videoDescription}</p>
                </div>
              </div>
            </div>
          )

          const renderResult = () => {
            console.log(apiStatus)
            switch (apiStatus) {
              case 'success':
                return renderVideos()
              case 'loading':
                return renderLoadingView()
              case 'failure':
                return renderFailureView()
              default:
                return null
            }
          }

          return (
            <div>
              <Header />
              <div className="video-container-route">
                <SideBar />
                {renderResult()}
              </div>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}
export default videoItemDetails
