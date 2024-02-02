import React, { useState } from 'react'
import '../styles/Login.css'
import logo from '../images/Logonetflix.png'
import Signup from './Signup'

const Login = () => {

  const [signIn, setSignIn] = useState(false)

  return (
    <div className='loginScreen'>
      <div className='loginScreen__background'>
        <img className='loginScreen__logo' src={logo} alt="login page logo" />
        {signIn?<></>:(
          <button onClick={()=>setSignIn(true)} className= "loginScreen__button">Sign in</button>
        )}
        <div className="loginScreen__gradient" />
      </div>
      <div className="loginScreen__body">
        {signIn? (<Signup />) :(
          <>
          <h1>Unlimited films, TV programmes and more.</h1>
          <h2>Watch anywhere. Cancel at anytime.</h2>
          <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
          <div className="loginScreen__input">
            <form >
              <input type="email" 
              placeholder='email address'
              />
              <button className='loginScreen__getStarted'
              onClick={()=>setSignIn(true)}
              >GET STARTED</button>
            </form>
          </div>
          </>
        )}
        
      </div>
    </div>
  )
}

export default Login
