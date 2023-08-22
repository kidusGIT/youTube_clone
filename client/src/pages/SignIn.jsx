import React from 'react'

// import components and css
import './page-style.css'
import SignInComponents from '../components/SignInComponents'
import SignUpComponents from '../components/SignUpComponents'

const SignIn = () => {
  document.title = 'Sign in or Login'

  return (
    <div className='sign-in-container' >
      <div className="sign-in-main-container">
          <SignInComponents />
          <h2> Or </h2> 
          <SignUpComponents />
      </div>
      <div className='sign-in-text' > 
        <p> English (USA) </p>
        <span>
           <p> Help </p>
           <p> Privacy </p>
           <p> Terms </p>
        </span>
      </div>
    </div>
  )
}

export default SignIn
