import {Component} from 'react'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'
import Loader from 'react-loader-spinner'
import './index.css'
import SideBar from '../SideBar'
import Header from '../Header'
import GamingVideoItem from '../GamingVideoItem'

class Gaming extends Component {
  state = {apiStatus: 'initial', data: []}

  componentDidMount() {
    this.getGamingData()
  }

  getGamingData = async () => {
    this.setState({apiStatus: 'loading'})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const formattedData = data.videos.map(i => ({
        channelId: i.id,
        title: i.title,
        thumbnailUrl: i.thumbnail_url,
        viewCount: i.view_count,
      }))
      //   console.log(formattedData)

      this.setState({apiStatus: 'success', data: formattedData})
    } else {
      this.setState({apiStatus: 'failure'})
    }
  }

  onRetry = () => {
    this.getGamingData()
  }

  renderLoadingView = () => (
    <div className="loader-container align" data-testid="loader">
      <Loader type="ThreeDots" color="green" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request.
        <br />
        Please try again.
      </p>
      <button onClick={this.onRetry} type="button">
        Retry
      </button>
    </div>
  )

  renderVideosView = () => {
    const {data} = this.state

    return (
      <div>
        <ul className="gaming-video-item-list">
          {data.map(i => (
            <GamingVideoItem key={i.channelId} itemDetails={i} />
          ))}
        </ul>
      </div>
    )
  }

  renderResult = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'success':
        return this.renderVideosView()
      case 'loading':
        return this.renderLoadingView()
      case 'failure':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="gaming-container">
          <SideBar />
          <div className="gaming-content-container">
            <header className="header">
              <div className="gaming-header-icon-container">
                <SiYoutubegaming color="red" size={25} />
              </div>
              <h1>Gaming</h1>
            </header>
            {this.renderResult()}
          </div>
        </div>
      </div>
    )
  }
}
export default Gaming
