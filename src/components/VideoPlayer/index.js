import {Component} from 'react'

import ReactPlayer from 'react-player'

import './index.css'

class VideoPlayer extends Component {
  state = {
    isPlaying: false,
  }

  onClickPlay = () => {
    this.setState(prevState => ({isPlaying: !prevState.isPlaying}))
  }

  render() {
    const {isPlaying} = this.state
    const btnText = isPlaying ? 'Pause' : 'Play'
    console.log('ok')
    const {data} = this.props
    const {videoUrl} = data
    console.log(videoUrl)

    const videoURL = videoUrl

    return (
      <div className="video-container">
        {/* <h1 className="heading">Video Player</h1> */}
        <div className="responsive-container">
          <ReactPlayer
            width="100%"
            url={videoURL}
            playing={isPlaying}
            controls
          />
        </div>
        {/* <button type="button" className="button" onClick={this.onClickPlay}>
          {btnText}
        </button> */}
      </div>
    )
  }
}

export default VideoPlayer
