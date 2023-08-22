import React from 'react'

// import components and css
import './components-style.css'

const Recommendation = () => {
  return (
    <div className='recommendation-container'>
        <img src="https://images.pexels.com/photos/327098/pexels-photo-327098.jpeg" alt="img" />
        <div className="recommendation-detail">
            <p className='recom-title'> Best Ethiopian Music  </p>
            <p className='recom-channel'> Lamma Dev </p>
            <p className='recom-view'> 2.5 M views • 5 years ago  </p>
        </div>
    </div>
  )
}

export default Recommendation