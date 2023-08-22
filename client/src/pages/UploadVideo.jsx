import React, { useEffect, useRef, useState } from 'react'

// IMPORT COMPONRNTS HERE
import { mainUrl, getCookie } from '../url'
import './page-style.css'


const UploadVideo = () => {
    const [userChannels, setUserChannels] = useState([])
    const form = useRef()

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

    const uploadVideo = async (e) => {
        e.preventDefault();
        const token = window.localStorage.getItem('token');
        const forms = new FormData(form.current)
        const value = [...forms.entries()]
        
        console.log(value)

        const response = await fetch(`${mainUrl.url}create-video`, {
            method: 'POST',
            headers:{
                "X-CSRFToken": getCookie("csrftoken"),
                'Authorization':`Token ${token}`,
            }, body: new FormData(form.current)
        })

        const data = await response.json()
        const status = response.status

        console.log('video: ', data);

        // if(status === 200){
        //     console.log('Channel Created')
        // } else {
        //     const data = await response.json()
        //     setErr(data)
        // }
    }

  return (
    <div className='channel-page'>
        <div className="channel-form">
            <form ref={form} action="" method="post">
                <div className="inputs">
                    <label> Channels </label>
                    <select name="channels" id="" className='channels-list'>
                        {userChannels.map((channel) => (
                            <option value={channel.id} key={channel.id}> {channel.name} </option>
                        ))}
                    </select>
                </div>

                <div className="inputs">
                    <label> Video Title </label>
                    <input name='title' type="text" placeholder='Video title' />
                </div>

                <div className="inputs">
                    <label> Video Description </label>
                    <textarea name="desc" id="" cols="30" rows="10"></textarea>
                </div>
                
                <div className="inputs">
                    <label> Cover Image </label>
                    <input name='cover_img' type='file' /> 
                </div>

                <div className="inputs">
                    <label> Video Upload </label>
                    <input name='vid_url' type='file' /> 
                </div>

                <button onClick={uploadVideo} > Create Video </button>
            </form>
        </div>
    </div>
  )
}

export default UploadVideo