import {Component} from 'react'
import Cookies from 'js-cookie'
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
      console.log(formattedData)

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

  render() {
    const {match} = this.props
    console.log(match)
    const {data, apiStatus, searchInput, hideBanner} = this.state
    return (
      <div>
        <Header />
        <div className="main-container-home">
          <SideBar />
          <div className="home-container">
            {hideBanner ? null : (
              <BgContainerHome>
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="logo"
                    width="200px"
                  />
                  <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                  <button type="button">GET IT NOW</button>
                </div>
                <div>
                  <button
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
                <button onClick={this.onSearchClick} type="button">
                  <AiOutlineSearch />
                </button>
              </div>

              <ul className="video-list">
                {data.map(i => (
                  <VideoItem key={i.channelId} itemDetails={i} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Home
