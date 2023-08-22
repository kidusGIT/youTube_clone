import React, { useEffect, useState } from 'react'

// CSS and other components import 
import './components-style.css'
import VideoCard from '../innerComponents/VideoCard'
import { mainUrl } from '../url'

const VideoCardContainer = () => {
  const [vidoes, setVideos] = useState([])
  
  useEffect(() => {
    const getRandomVideo = async () => {
      console.log('url: ', mainUrl.url)
      const response = await fetch(`${mainUrl.url}get-random-video`);

      const data = await response.json()
      console.log('res: ', data)

      setVideos(data)
    }

    getRandomVideo()
  }, [])

  return (
    <div className={'card-container' }>
      {vidoes.map((video) => (
        <VideoCard 
          key={video.id} 
          id={video.id} 
          views={video.views}
          title={video.title}
          imgUrl={video.cover_img}
          createdAt={video.create_at}
          channelName={video.channels.name}
          channleImg={video.channels.profile_pic}
         
        />
      ))}
      
    </div>
  )
}

export default VideoCardContainer