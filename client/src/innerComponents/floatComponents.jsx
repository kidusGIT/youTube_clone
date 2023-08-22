import React from 'react';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import SensorsOutlinedIcon from '@mui/icons-material/SensorsOutlined';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// import user built components here
import './inner-style.css'
import { loggoutUser } from '../auth/auth'
import { userInfo } from '../redux/action';

export const ChannelDetail = ({setDisplayChannel}) => {

    const dispatch = useDispatch();
    function signOut(){
        console.log('logged out')
        loggoutUser();
        dispatch(userInfo(null))
        setDisplayChannel(false)
    }

    function closePop() {
        setDisplayChannel(false)
    }

    const id = window.localStorage.getItem('id')

    return (
        <div className="channel-float">
            
            <div className="channel-float-btn">
                <Link to={`/channel/${id}`} onClick={closePop} >
                    <AccountBoxOutlinedIcon />
                    <p> Your channel </p>
                </Link>
            </div>

            <div className="channel-float-btn">
                <Link to={'#'} onClick={signOut}>
                    <LogoutOutlinedIcon />  
                    <p> Sign out </p>
                </Link>
            </div>
        </div>
    )
}

export const UpLoadVideo = ({setVideoUpload}) => {

    function closePop() {
        setVideoUpload(false)
    }

    return(
    <div className="video-float">
            
        <div className="channel-float-btn">
            <Link to='/video/upload' onClick={closePop}>
                <OndemandVideoOutlinedIcon />
                <p> Upload Video </p>
            </Link>
        </div>

        <div className="channel-float-btn">
            <Link to={'#'} onClick={closePop} >
                <SensorsOutlinedIcon />  
                <p> On live  </p>
            </Link>
        </div>
    </div>
    )
}