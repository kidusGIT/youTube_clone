import React from 'react'

// components
import './page-style.css'
import VideoCardContainer from '../components/VideoCardContainer'

const HomePage = () => {
  document.title = 'YouTube'

  return (
    <div className='home-main-container' >
      
      <VideoCardContainer />
    </div>
   
  )
}

export default HomePage