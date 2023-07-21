import {Component} from 'react'
import {AiOutlineMenuUnfold} from 'react-icons/ai'
import {Loader} from 'react-loader-spinner'
import './index.css'
import SideBar from '../SideBar'
import Header from '../Header'
import Context from '../../Context/Context'
import SavedVideoItem from '../SavedVideoItem'

class Saved extends Component {
  render() {
    return (
      <Context.Consumer>
        {value => {
          const {savedVideoList} = value
          const zeroList = savedVideoList.length === 0

          return (
            <div>
              <Header />
              <div className="saved-container">
                <SideBar />
                <div className="saved-content-container">
                  <header className="saved-header">
                    <div className="saved-header-icon-container">
                      <AiOutlineMenuUnfold color="red" size={25} />
                    </div>
                    <h1>Saved Videos</h1>
                  </header>

                  {zeroList ? (
                    <div className="no-saved-videos">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                        alt="no saved videos"
                        width="350px"
                      />
                      <h2>No saved videos found</h2>
                      <p>You can save your videos while watching them</p>
                    </div>
                  ) : (
                    <ul className="saved-video-item-list">
                      {savedVideoList.map(i => (
                        <SavedVideoItem key={i.videoId} itemDetails={i} />
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}
export default Saved
