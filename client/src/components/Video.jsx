import React, { useRef, useState } from 'react'

// icons
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause';
import SettingsIcon from '@mui/icons-material/Settings';
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import PictureInPictureAltIcon from '@mui/icons-material/PictureInPictureAlt';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import PlayArrow from '@mui/icons-material/PlayArrow';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

// import css here
import './video-style.css'
import { formatTime } from '../url'

const Video = ({ vid_url, setTheaterMode, theaterMode }) => {
  // STATES
  const[play, setPlay] = useState()
  const[mute, setMute] = useState(false)
  const[fullscreen, setFullscreen] = useState(false)
  const[isScrubbing, setIsScrubbing] = useState(false)
      
  // REFS
  const videoPlayer = useRef()
  const progressBar = useRef()
  const videoWrapper = useRef()
  const timeLine = useRef()
  const volumSlider = useRef()
  const totalTime = useRef()
  const currentTime = useRef()

  // VOLUME FUNCTIONS
  const toggleMute = () => {
    videoPlayer.current.muted = !videoPlayer.current.muted
  } 

  const changeVolume = (e) => {
    volumSlider.current.value = videoPlayer.current.volume

    if(videoPlayer.current.muted || videoPlayer.volume === 0){
      volumSlider.current.value = 0
      setMute(true)
    } else {
      setMute(false)
    }
  }

  const volumInput = (e) => {
    videoPlayer.current.volume = e.target.value
    videoPlayer.current.muted = e.target.value === 0
  }

  // VIDEO FUNCTIONS

  const playeVideo = () => {
    videoPlayer.current.paused ? videoPlayer.current.play() : videoPlayer.current.pause() 
    setPlay(!play)
  }

  const updateTime = (e) => {
    currentTime.current.innerText = formatTime(videoPlayer.current.currentTime)
    const percent = videoPlayer.current.currentTime / videoPlayer.current.duration
    timeLine.current.style.setProperty("--progress-possition", percent)
  }

  const picInPic = () => {
    videoPlayer.current.requestPictureInPicture()
  }

  const playVid = () => {
    setPlay(true);
  }

  const pauseVid = () => {
    setPlay(false);
  }

  // DURATION
  const loadedData = (e) => {
    totalTime.current.innerText = formatTime(e.target.duration);
  }

  const toggleScrubbing = (e) =>{
    const rect = timeLine.current.getBoundingClientRect();
    const percent = Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width
    
    console.log('rect: ', rect.x)
    console.log('clientX: ', e.clientX)
    console.log('width: ', rect.width)

    console.log('diff: ', rect.width -  e.clientX)

    console.log('percent: ', percent)

    const scrubbed = (e.buttons & 1) === 1
    setIsScrubbing(scrubbed)
    if(!isScrubbing){
      videoPlayer.current.currentTime = percent * videoPlayer.current.duration
    } 

    handelTimeLineUpdate(e);
  }

  const handelTimeLineUpdate = (e) => {
    const rect = timeLine.current.getBoundingClientRect();
    const percent = Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width
    
    timeLine.current.style.setProperty("--preview-position", percent)
    
    if(isScrubbing){
      e.preventDefault()
      timeLine.current.style.setProperty("--preview-position", percent)

    }
  }

  const checkScrubbing = (e) => {
    toggleScrubbing(e)
  }

 
  const changeTimeLine = (e) => {
    let timeLineWidth = timeLine.current.clientWidth;
    // e.clientX => X co-ordinate of the mouse
    console.log('time line: ', timeLineWidth)
    console.log('offsetX: ', e.clientX)
    let seek = (e.clientX / timeLineWidth) * videoPlayer.current.duration;
    console.log('seek: ',seek)
    
    videoPlayer.current.currentTime = (e.clientX / timeLineWidth) * videoPlayer.current.duration;
  } 
  
  
  

  const fullScreenSettings = () => {
    if(document.fullscreenElement){
      setFullscreen(!fullscreen)
      return document.exitFullscreen();
    }
    
    setFullscreen(!fullscreen)
    document.documentElement.requestFullscreen()
  }

  return (
    <div className= {fullscreen ? "video-wrapper fullscreen" : "video-wrapper paused" } ref={videoWrapper} >
      <div className="video-container ">
          <div 
            className="timeline-container" 
            ref={timeLine}
            onMouseMove={handelTimeLineUpdate}
            onMouseDown={toggleScrubbing}
            onMouseUp={checkScrubbing}
          >
            <div className="timeline">
              <div className="thumb-indicator"></div>
            </div>
          </div>
          
          <div className="controles-container">
            <div className="left">
              <button className="skip-forward" onClick={playeVideo} > {play ? <PauseIcon /> : <PlayArrow />} </button>
              <button className="play-pause"> <SkipNextIcon /> </button>
              
              <div className="volume-container">
                <button className="volume" onClick={toggleMute} > { mute ? <VolumeOffIcon /> : <VolumeUpIcon />} </button>
                <input 
                  type='range'
                  className='volume-slider'  
                  onInput={volumInput} min='0' max='1' step='any' 
                  ref={volumSlider} 
                  
                />
              </div>
              <div className="durations">
                <div className="current-time" ref={currentTime}>00:00</div>
                /
                <div className="total-time" ref={totalTime} ></div>  
              </div>                    
            </div>

            <div className="right">
              <button className="setting"> <SettingsIcon /> </button>
              <button className="pic-in-pic" onClick={picInPic} > <PictureInPictureAltIcon /> </button>
              <button className="cinema-mode" onClick={() => {setTheaterMode(!theaterMode)}} > <RectangleOutlinedIcon /> </button>
              <button className="full-screen-mode" onClick={fullScreenSettings}>{fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />} </button>
            </div>
          </div>
      </div>

      <video 
        autoPlay
        onVolumeChange={changeVolume}
        onPause={pauseVid}
        onPlay={playVid}
        ref={videoPlayer}
        src={vid_url}
        onTimeUpdate={updateTime}
        onLoadedData={loadedData}
      >
        Your browser does not support HTML5 video.
      </video>

    </div>  
  )
}

export default Video