import React, {useRef, useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

// CSS and other components import 
import {ReactComponent as LogoWhite } from '../img/Logo.svg'
import { ReactComponent as LogoBlack } from '../img/logoBlack.svg'
import './components-style.css'
import { showMenu, hideMenu } from '../redux/action';
import { ChannelDetail, UpLoadVideo } from '../innerComponents/floatComponents';

const Header = ({ darkMode }) => {
  // STATE
  const [displayChannel, setDisplayChannel] = useState(false)
  const [videoUpload, setVideoUpload] = useState(false)

  // REDUX PART 
  const dispatch = useDispatch()
  const menu = useSelector(state => state.reducer.menuShow)
  const floatChannel = useRef(null)
  const user = useSelector(state => state.reducer.user)

  // FUNCTIONS ARE HERE
  const uploadVideo = () => {
    if(displayChannel)
      setDisplayChannel(!displayChannel)
    setVideoUpload(!videoUpload)
  }

  const changeMenu = () => {
    if(menu){
      return dispatch(hideMenu())
    } 
    
    return dispatch(showMenu())
  }

  const displayeChannelFloat = () => {
      if(videoUpload)
        setVideoUpload(!videoUpload)
      setDisplayChannel(!displayChannel)
  }

  return (
    <div className='header-conatiner'>
      <div className="sidep-bar-btn">
          <button onClick={changeMenu}>
              <MenuOutlinedIcon />
          </button>
          <Link to='/' className='logo-link'>
               {darkMode ? <LogoBlack /> : <LogoWhite /> } 
          </Link>
      </div>
      
      {displayChannel ? <ChannelDetail setDisplayChannel={setDisplayChannel} /> : null} 
    
      {videoUpload ? <UpLoadVideo setVideoUpload={setVideoUpload} /> : null} 
      <div className='search-div'>
          <div className="search">
            <input type="text" placeholder='Search' />
            <button>
              <SearchIcon />
            </button>
          </div>
      </div>

       {user === null || user === {} ? 
        <div className='header-signin-container'>
          <Link to='/sign-in' className='signin-btn'>
              <AccountCircleOutlinedIcon />
              SIGN IN
            </Link>
        </div>
       : 
        <div className="user-profile">
            <button className='add-video' onClick={uploadVideo} >
                <VideoCallOutlinedIcon />
            </button>

            <button className='add-video' >
                <NotificationsNoneOutlinedIcon />
            </button>

            <button className='add-video' onClick={displayeChannelFloat}>
                <img src="https://images.pexels.com/photos/327098/pexels-photo-327098.jpeg" alt="" className='profile-pic' />
            </button>

        </div>
      }


    </div>
  )
}

export default Header