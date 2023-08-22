import React, { useRef } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
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
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


// IMPORT CSS AND A COMPONENETS HERE
import './page-style.css'
import Item from '../innerComponents/Item'
import SubList from '../innerComponents/SubList';
import { showMenu, hideMenu } from '../redux/action';
import { ReactComponent as LogoBlack } from '../img/logoBlack.svg'
import {ReactComponent as LogoWhite } from '../img/Logo.svg'
// import Logo from '../img/logo.png'

const SideBar = ({darkMode, setDarkMode }) => {
  const menu = useSelector(state => state.reducer.menuShow)
  const user = useSelector(state => state.reducer.user)
  const dispatch = useDispatch()
  const subs = useRef(null)

  const changeMenu = () => {
    if(menu){
      return dispatch(hideMenu())
    } 
    return dispatch(showMenu())
  }
  
  return (
    <div className={menu ? 'side-bar' : 'side-bar show'} >
        <nav>
            <div className="sidep-bar-btn">
                <button onClick={changeMenu}>
                    <MenuOutlinedIcon />
                </button>
                <Link to='/' className='logo-link'>
                    {darkMode ? <LogoBlack /> : <LogoWhite /> }
                </Link>
            </div>
            <aside>
                <div className="sub-sidebar-style">
                    <Item Icon={HomeIcon} title='Home' menu='/' />
                    <Item Icon={ExploreOutlinedIcon} title='Explore' menu='#' />
                    <Item Icon={SubscriptionsOutlinedIcon} title='Subscriptions' menu='#' />
                </div>
                
                <div className="boder-line"></div>
                
                <div className="sub-sidebar-style">
                    <Item Icon={VideoLibraryOutlinedIcon} title='Library' menu='#' />
                    <Item Icon={HistoryOutlinedIcon} title='History' menu='#' />
                </div>

                <div className="boder-line"></div>

                {user !== null ? 
                    <div className="users-subs-list-container">
                        {/* <div className="users-subs-lists">
                        </div>
                    <button> expand </button> 
                    */}
                    <div>
                    <SubList />
                    <SubList />
                    <SubList />
                    <SubList />
                    <SubList />
                    <SubList />
                    <SubList />
                    <SubList />
                    <SubList />
                    <SubList />
                    <SubList />
                    <SubList />
                    <SubList />
                    <SubList />
                    <SubList />
                    <SubList />
                    <SubList />
                    <SubList />
                    <SubList />
                    <SubList />
                    <SubList />
                    <SubList />
                    <SubList />
                    <SubList />
                    </div>
                    </div>
                : 
                <div className="sign-in-holder">
                    <p> Sign in to like videos, comments, and subscribe </p>
                    <Link to='/sign-in' className='signin-btn'>
                        <AccountCircleOutlinedIcon />
                        SIGN IN
                    </Link>
                </div>
                }

                <div className="boder-line"></div>
                {/* <p className='best'> BEST OF YOUTUBE </p> */}
                <div className="sub-sidebar-style">
                    <Item Icon={LibraryMusicOutlinedIcon} title='Music' menu='#' />
                    <Item Icon={SportsBasketballOutlinedIcon} title='Sports' menu='#' />
                    <Item Icon={SportsEsportsOutlinedIcon} title='Gaming' menu='#' />
                    <Item Icon={MovieCreationOutlinedIcon} title='Movies' menu='#' />
                    <Item Icon={FeedOutlinedIcon} title='News' menu='#' />
                    <Item Icon={LiveTvOutlinedIcon} title='Live' menu='#' />
                </div>
                
                <div className="boder-line"></div>

                <div className="sub-sidebar-style">
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
            
    
            </aside>
        </nav>
    </div>
  )
}

export default SideBar