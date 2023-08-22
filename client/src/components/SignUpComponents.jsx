import React from 'react'
import { useState } from 'react'

// CSS and other components import 
import './components-style.css'
import { registerAuser } from '../auth/auth'

const SignUpComponents = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  // SIGN UP A USER
  const signUp = () => {
    registerAuser(name, fullName, password)
  }

  return (
    <div className='sign-up-container'>
        <input type="text" placeholder='Full name' onChange={(e) => setFullName(e.target.value)} />
        <input type="text" placeholder='Username' onChange={(e) => setName(e.target.value)} />
        <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />

        <button onClick={signUp}> Sign up </button>
    </div>
  )
}

export default SignUpComponents