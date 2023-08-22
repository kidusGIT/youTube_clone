import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import OutlinedFlagOutlinedIcon from '@mui/icons-material/OutlinedFlagOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// CSS and other components import 
import './components-style.css'
import Item from '../innerComponents/Item';
import SubList from '../innerComponents/SubList'

const Menu = ({darkMode, setDarkMode }) => {
  const menu = useSelector(state => state.reducer.menuShow)

  const user = useSelector(state => state.reducer.user)
  console.log('user:', user)
  return (
    <div className={menu ? 'menu-container show' : 'menu-container' }>
     
      <Item Icon={HomeIcon} title='Home' menu='/' />
      <Item Icon={ExploreOutlinedIcon} title='Explore' menu='#' />
      <Item Icon={SubscriptionsOutlinedIcon} title='Subscriptions' menu='#' />
      
      <div className='line' ></div>

      <Item Icon={VideoLibraryOutlinedIcon} title='Library' menu='#' />
      <Item Icon={HistoryOutlinedIcon} title='History' menu='#' />

      <div className='line' ></div>

      {user !== null ? 
        <div className='user-subs' >
          <p className='subscriptions'> Subscriptions </p>
          <SubList />
          <SubList />
          
        </div>
      : 
      <div className="menu-signin">
          <p> Sign in to like videos, comments, and subscribe </p>
          <Link to='/sign-in' className='signin-btn'>
            <AccountCircleOutlinedIcon />
            SIGN IN
          </Link>
      </div>
      }

      <div className='line' ></div>
      <p className='best'> BEST OF YOUTUBE </p>

      <Item Icon={LibraryMusicOutlinedIcon} title='Music' menu='#' />
      <Item Icon={SportsBasketballOutlinedIcon} title='Sports' menu='#' />
      <Item Icon={SportsEsportsOutlinedIcon} title='Gaming' menu='#' />
      <Item Icon={MovieCreationOutlinedIcon} title='Movies' menu='#' />
      <Item Icon={FeedOutlinedIcon} title='News' menu='#' />
      <Item Icon={LiveTvOutlinedIcon} title='Live' menu='#' />
      
      <div className='line' ></div>

      <Item Icon={SettingsOutlinedIcon} title='Settings' menu='#' />
      <Item Icon={OutlinedFlagOutlinedIcon} title='Report' menu='#' />
      <Item Icon={HelpOutlineOutlinedIcon} title='Help' menu='#' />
      <Item 
        Icon={SettingsBrightnessOutlinedIcon} 
        title='Light Mode' 
        menu='#'
        click={true}
        setDarkMode={setDarkMode}
        darkMode={darkMode}
       />

    </div>
  )
}

export default Menu