import React from 'react'
import { Link } from 'react-router-dom'

// css and components import
import './inner-style.css'

function SubList() { 
  return (
    <Link to={`#`} className='user-subsc'>
      <div className='sub-channel'>
            <img src="https://images.pexels.com/photos/327098/pexels-photo-327098.jpeg" alt="" />
            <p> Channel Name </p>
      </div>
    </Link>
  )
}

export default SubList