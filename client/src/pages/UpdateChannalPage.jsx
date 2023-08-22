import React, { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// IMPORT COMPONRNTS HERE
import { mainUrl, getCookie } from '../url'
import './page-style.css'


const UpdateChannalPage = () => {
    const form = useRef()
    const [err, setErr] = useState('')
    const params = useParams()

    const [channel, setChannel] = useState([])
    const [name, setName] = useState('')

    useEffect(() => {
      const getChannels = async () => {
        // const id = window.localStorage.getItem('id');
        const token = window.localStorage.getItem('token');

        const response = await fetch(`${mainUrl.url}get-channel/${params.id}`, {
            headers:{'Authorization':`Token ${token}`}
        })

        const data = await response.json()
        setChannel(data)
        setName(data.name)
      }

      getChannels()

    }, [])

    const createForm = async (e) => {
        e.preventDefault();
        const token = window.localStorage.getItem('token');
        
        const response = await fetch(`${mainUrl.url}update-channel/${params.id}`, {
            method: 'PUT',
            headers:{
                "X-CSRFToken": getCookie("csrftoken"),
                'Authorization':`Token ${token}`,
            }, body: new FormData(form.current)
        })

        const status = response.status
        if(status === 200){
            console.log('Channel Updated')
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
                    <input name='name' type="text"  onChange={(e) => setName(e.target.value)} value={name} placeholder='Chanel name' />
                 </div>

                <div className="inputs">
                    <label> Channel Profile </label>
                    <input  name='profile_pic' type='file' />
                </div>
                
                <div className="inputs">
                    <label> Channel Banner </label>
                    <input  name='banner' type='file' /> 
                </div>

                <button onClick={createForm}> Update Channel </button>
            </form>
        </div>
    </div>
  )
}

export default UpdateChannalPage