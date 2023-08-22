import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

// IMPORT COMPONENTS HERE
import { mainUrl, getCookie } from '../url'
import ChannalListCard from '../components/ChannalListCard'
import './page-style.css'

const ChannalList = () => {
    const params = useParams()
    const id = params.id

    const [userChannels, setUserChannels] = useState([])

    useEffect(() => {
      const getChannels = async () => {
        const id = window.localStorage.getItem('id');
        const token = window.localStorage.getItem('token');

        const response = await fetch(`${mainUrl.url}get-user-channel/${id}`, {
            headers:{'Authorization':`Token ${token}`}
        })

        const data = await response.json()
        // console.log('data: ', data)
        setUserChannels(data)
    }

    getChannels()
    }, [])


  return (
    <div className='channal-list-container' >
        <div className="channal-list-holder">
            <div>
               <Link to='/channel/create' className='new-channel-btn' > 
                <p> Create Channel </p> 
                
                </Link>
            </div>

            {userChannels.map((channel) => (
              <ChannalListCard 
                  key={channel.id}
                  id={channel.id}
                  img={`${mainUrl.imagesUrl}${channel.profile_pic}`}
                  name={channel.name}
                  subs={channel.subs}
              />
            ))}
        </div>
    </div>
  )
}

export default ChannalList