import React from 'react'
import { Link } from 'react-router-dom'

// css and components import
import './inner-style.css'

const Item = ({ Icon, title, menu, click, darkMode, setDarkMode }) => {
  const clickFunction = () => {
    if(click) {
      console.log('clciked')
      setDarkMode(!darkMode)
    }
  }

  return (
    <div className='item-container' onClick={clickFunction} >
      <Link to={menu} className='item-link' > 
        <Icon  />
        <p> {title} </p>
      </Link>

    </div>
  )
}

export default Item
