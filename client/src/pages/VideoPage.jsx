import React, { useEffect, useRef, useState, } from 'react'
import { useParams } from 'react-router-dom'
import { format } from 'timeago.js';

// ICONS
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";


// import components
import './video-page-style.css'
import Comment from '../components/Comment';
import Video from '../components/Video';
import Recommendation from '../components/Recommendation';
import { mainUrl, getCookie } from '../url'

const VideoPage = () => {
  const [hideComment, setHideComment] = useState(true)
  const[video, setVideo] = useState({})
  const[sub, setSub] = useState(0)
  const[userSubs, setUserSubs] = useState([])
  const[theaterMode, setTheaterMode] = useState(false)
    
  const params = useParams()

  useEffect(() => {
    async function getVideo(){
      const response = await fetch(`${mainUrl.url}get-video/${params.id}`);
      const data = await response.json()
      setVideo(data)
      setSub(data?.channels?.subs)
    }

    getVideo()
  }, [params.id])

  useEffect(() => {
    const getUserSubs = async () => {
      const token = window.localStorage.getItem('token');
      const response = await fetch(`${mainUrl.url}getsubs-channel`, {
        method: 'GET',
        headers:{
          'Authorization':`Token ${token}`,
        },
      })

      const data = await response.json()
      setUserSubs(data)
    }

    getUserSubs()
  }, [sub])

  document.title = video.title
  
  const subChannel = async () => {
      // channel-id
      const token = window.localStorage.getItem('token');
      const response = await fetch(`${mainUrl.url}sub-channel/${video?.channels?.id}`, {
        method: 'PUT',
        headers:{
          "X-CSRFToken": getCookie("csrftoken"),
          'Authorization':`Token ${token}`,
        },
      })

      const data = await response.json()
      setSub(data.sub)
  }

  const unSubChannel = async () => {
      // channel-id
      const token = window.localStorage.getItem('token');
      const response = await fetch(`${mainUrl.url}unsub-channel/${video?.channels?.id}`, {
        method: 'PUT',
        headers:{
          "X-CSRFToken": getCookie("csrftoken"),
          'Authorization':`Token ${token}`,
        },
      })

      const data = await response.json()
      setSub(data.sub)
  }

  const isSubscribed = () => {
    const channel = userSubs.filter((sub) => {
      return sub?.channels.id === video?.channels?.id
    })

    if(channel.length === 1) {
      return true
    }

    return false
  }
     
  return (
    <div className='video-page-container'>
        <div className={theaterMode ? "video-holder theater" : "video-holder"} >
          <Video 
            setTheaterMode={setTheaterMode}
            theaterMode={theaterMode}
            vid_url={`${mainUrl.imagesUrl}${video?.vid_url}`}
          />
        </div> 

        <div className="video-page-recommendation">
            <Recommendation />
            <Recommendation />
            <Recommendation />
        </div>

      <div className="video-page-content">

          <div className="vidoe-page-body">
            <h2 className='video-title'> {video.title} </h2>
            <div className="video-view-detail">
              <p> {video.views} views • {format(video.create_at)} </p>
              <div className="video-button">
                  <button> 
                    <ThumbUpOutlinedIcon />
                  </button>
                    {video.like}
                  <button> 
                    <ThumbDownOffAltOutlinedIcon />
                  </button>
                  {video.dis_like}
                  <button> 
                    <ReplyOutlinedIcon />
                  </button>
                    Share

                  <button> 
                    <AddTaskOutlinedIcon />
                  </button>
                    Save
              </div>
            </div>

            <div className="subscribe">
                <img src={`${mainUrl.imagesUrl}${video?.channels?.profile_pic}`} alt='no pictuer' />
                <div className="veido-channel-detail">
                    <p className='video-title'> 
                      {video?.channels?.name} 
                    </p>
                    <p className='video-sub'> 
                      { sub } 
                    </p>
                </div>
                {isSubscribed() ? 
                  <button onClick={unSubChannel} className='sub-sub' > SUBSCRIBED </button> 
                  : 
                  <button onClick={subChannel} className='un-sub' > SUBSCRIBE </button>
                }
                
            </div>
            {/* write-comment */}
            
            {hideComment ?  (
            <div className='write-comment' >
                <img src="https://images.pexels.com/photos/327098/pexels-photo-327098.jpeg" alt='no pictuer' />
                <input placeholder='Write a comment here..' onClick={() => setHideComment(false)} />
            </div> ) : (
              <div className="send-comment">
                <div className="profile">
                  <img src="https://images.pexels.com/photos/327098/pexels-photo-327098.jpeg" alt='no pictuer' />
                  <p> Lamma Dev </p>
                </div>
                
                <input placeholder='Write a comment here..' />
                <div className="comment-buttons">
                    <p> By completing this action you are creating a ​channel and agree to ​YouTube's Terms of Service. </p>
                    <button className='comment-cancel-button' onClick={() => setHideComment(true)} > CANCEL </button>
                    <button className='comment-button'> COMMENT </button>
                </div>
              </div>
            ) }

            <Comment />
            <Comment />
            <Comment />
            <Comment />
            
          </div>

      </div>

       
    </div>
  )
}

export default VideoPage