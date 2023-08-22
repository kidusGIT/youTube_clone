import React, { useState, useRef } from 'react'

// IMPORT COMPONRNTS HERE
import { mainUrl, getCookie } from '../url'
import './page-style.css'


const ChannelPage = () => {
    const form = useRef()
    const [err, setErr] = useState('')

    const createForm = async (e) => {
        e.preventDefault();
        const token = window.localStorage.getItem('token');
        
        const response = await fetch(`${mainUrl.url}create-channel`, {
            method: 'POST',
            headers:{
                "X-CSRFToken": getCookie("csrftoken"),
                'Authorization':`Token ${token}`,
            }, body: new FormData(form.current)
        })

        const status = response.status
        if(status === 200){
            console.log('Channel Created')
        } else {
            const data = await response.json()
            setErr(data)
        }

    }   

  return (
    <div className='channel-page'>
        <div className="channel-form">
            <form ref={form} action="" method="post">
                <p> {err} </p>
                <div className="inputs">
                    <label> Channel Name </label>
                    <input name='name' type="text" placeholder='Chanel name' />
                 </div>

                <div className="inputs">
                    <label> Channel Profile </label>
                    <input name='profile_pic' type='file' />
                </div>
                
                <div className="inputs">
                    <label> Channel Banner </label>
                    <input name='banner' type='file' /> 
                </div>

                <button onClick={createForm}> Create Channel </button>
            </form>
        </div>
    </div>
  )
}

export default ChannelPage