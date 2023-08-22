import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'

// CSS and other components import
import './inner-style.css'
import { mainUrl } from '../url'

const VideoCard = ({ id, views, title, imgUrl, createdAt, channelName, channleImg }) => {
    
  return (

    <div className={'video-card-container'}>
      <Link to={`/video/${id}`} className='card-link'> 
        <img 
          src={!imgUrl ? `https://images.pexels.com/photos/327098/pexels-photo-327098.jpeg` : `${mainUrl.imagesUrl}${imgUrl}`}
          alt='no pictuer'
        />

        <div className='video-card-detail' >
            <div className="channel-img-container">
                <img 
                  className='video-img'
                  src={`${mainUrl.imagesUrl}${channleImg}`} 
                  alt='no pictuer' 
                />
            </div>
            <div className='channel-detail'>
                 <p className='title'> {title} </p>
                 <p className='channel-name'> {channelName} </p>
                 <p className='view-detail'> {views} views  •  {format(createdAt)} </p>
            </div>
        </div>
        </Link>
    </div>
  )
}

export default VideoCard