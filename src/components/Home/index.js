import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {AiOutlineSearch, AiOutlineClose} from 'react-icons/ai'

import Header from '../Header'
import './index.css'
import {BgContainerHome} from './styledComponents'
import VideoItem from '../VideoItem'
import SideBar from '../SideBar'

class Home extends Component {
  state = {searchInput: '', apiStatus: 'initial', data: [], hideBanner: false}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: 'loading'})
    const {searchInput} = this.state
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
        channelName: i.channel.name,
        channelProfileImage: i.channel.profile_image_url,
        channelId: i.id,
        publishedAt: i.published_at,
        thumbnailUrl: i.thumbnail_url,
        title: i.title,
        viewCount: i.view_count,
      }))
      //   console.log(formattedData)

      this.setState({apiStatus: 'success', data: formattedData})
    } else {
      this.setState({apiStatus: 'failure'})
    }
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchClick = () => {
    this.getData()
  }

  onClickClose = () => {
    this.setState({hideBanner: true})
  }

  onRetry = () => {
    this.getData()
  }

  renderNoResults = () => (
    <div className="no-search-results">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
        width="50%"
      />
      <h1>No Search results found</h1>
      <p>Try different key words or remove search filter</p>
      <button onClick={this.onRetry} type="button">
        Retry
      </button>
    </div>
  )

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
    const zeroData = data.length === 0

    return (
      <div>
        {zeroData ? (
          this.renderNoResults()
        ) : (
          <ul className="video-list">
            {data.map(i => (
              <VideoItem key={i.channelId} itemDetails={i} />
            ))}
          </ul>
        )}
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
    const {data, apiStatus, searchInput, hideBanner} = this.state

    return (
      <div>
        <Header />
        <div className="main-container-home">
          <SideBar />
          <div className="home-container">
            {hideBanner ? null : (
              <BgContainerHome data-testid="banner">
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="nxt watch logo"
                    width="200px"
                  />
                  <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                  <button type="button">GET IT NOW</button>
                </div>
                <div>
                  <button
                    data-testid="close"
                    className="close-button-home"
                    onClick={this.onClickClose}
                    type="button"
                  >
                    <AiOutlineClose />
                  </button>
                </div>
              </BgContainerHome>
            )}

            <div className="home-videos-section">
              <div className="search-section">
                <input
                  onChange={this.onSearchInput}
                  placeholder="Search"
                  value={searchInput}
                  type="search"
                />
                <button
                  data-testid="searchButton"
                  onClick={this.onSearchClick}
                  type="button"
                >
                  <AiOutlineSearch />
                </button>
              </div>

              {this.renderResult()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Home
