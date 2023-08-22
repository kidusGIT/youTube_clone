import React from 'react'

// import components and css
import './components-style.css'

const Comment = () => {
  return (
    <div className='comment-style'>
        <img src="https://images.pexels.com/photos/327098/pexels-photo-327098.jpeg" alt="img" />
        <div className="comment-aurthor">
            <p className='comments'> Name <span> 2 days ago </span> </p>
            <p className='comment-essay'>
                Lorem ipsum dolor sit amet consectetur, 
                adipisicing elit. Impedit ex ratione similique vero illum,
                 nostrum et aliquid quasi libero omnis ea laboriosam ducimus 
                 dolorem eveniet id modi delectus, earum harum!

                 Lorem ipsum dolor sit amet consectetur 
                 adipisicing elit. Quos, explicabo! Recusandae, 
                 itaque quasi quos illo rerum iure, exercitationem ipsa 
                 dolores quaerat quisquam nulla.
                  Tempora adipisci non, rem porro quod consectetur.
            </p>
        </div>
    </div>
  )
}

export default Comment