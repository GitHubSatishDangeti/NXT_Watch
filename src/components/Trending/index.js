import {Component} from 'react'
import Cookies from 'js-cookie'
import {HiFire} from 'react-icons/hi'
import './index.css'
import SideBar from '../SideBar'
import Header from '../Header'
import TrendingVideoItem from '../TrendingVideoItem'

class Trending extends Component {
  state = {apiStatus: 'initial', data: []}

  componentDidMount() {
    this.getTrendingData()
  }

  getTrendingData = async () => {
    this.setState({apiStatus: 'loading'})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
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
        channelName: i.channel.name,
        channelProfileImage: i.channel.profile_image_url,
        viewCount: i.view_count,
        publishedAt: i.published_at,
      }))
      console.log(formattedData)

      this.setState({apiStatus: 'success', data: formattedData})
    } else {
      this.setState({apiStatus: 'failure'})
    }
  }

  render() {
    const {data} = this.state

    return (
      <div>
        <Header />
        <div className="trending-container">
          <SideBar />
          <div className="trending-content-container">
            <header className="header">
              <div className="header-icon-container">
                <HiFire color="red" size={25} />
              </div>
              <h1>Trending</h1>
            </header>

            <ul>
              {data.map(i => (
                <TrendingVideoItem key={i.channelId} itemDetails={i} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Trending
