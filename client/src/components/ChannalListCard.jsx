import React from 'react'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Link } from 'react-router-dom';

// CSS and other components import 
import './components-style.css'

const ChannalListCard = ({ id, img, name, subs }) => {
  return (
    <div className='channel-card-container'>
        {/* image
          channel name
          subscribes
          delete Button
        */}

        <img src={img} alt="" />

        <div className='channal-detail-div' >
           <p> <Link to={`/channel/update/${id}`} className='channel-update' > {name} </Link> </p>
           <p> {subs} </p>
        </div>

        <button> <DeleteOutlinedIcon /> </button>
        
    </div>
  )
}

export default ChannalListCard