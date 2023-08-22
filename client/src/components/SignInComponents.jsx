import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

// CSS and other components import 
import './components-style.css'
import { loginUser } from '../auth/auth'
import { userInfo } from '../redux/action'

const SignInComponents = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  // SIGN IN A USER
  const signIn =  async () => {
    console.log('here')
    const user = loginUser(name, password)
    // const user = window.localStorage.getItem('username')
    const data = await user
    console.log('username: ', data)
    if(data === name) dispatch(userInfo(data))
  }
 
  return (
    <div className='sign-in-container-comp'>
        <h2> Sign in </h2>
        <h3> To continue to YouTube </h3>
        <input type="text" placeholder='Username' onChange={(e) => setName(e.target.value)} />
        <input type="password" placeholder='Psassword' onChange={(e) => setPassword(e.target.value)} />

        <button onClick={signIn}> Sign in </button>
    </div>
  )
}

export default SignInComponents