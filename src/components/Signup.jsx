import React, { useRef, useState } from 'react'
import '../styles/Signup.css'
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
const Signup = () => {

    //User authentication states
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const navigate = useNavigate();
    const [signUp, setSignUp] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    
    //Register function
    const register = (e) => {
        e.preventDefault();
        setSignUp(true)
        createUserWithEmailAndPassword(
            auth,
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser)=>{
            navigate("/")
            console.log(authUser)
        }).catch((error)=>{
          setErrorMessage("Invalid email/password")
        })
    };

    //Sign in function
    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth,
            emailRef.current.value,
            passwordRef.current.value
            ).then((authUser)=>{
                console.log(authUser)
                setError(false)
                navigate("/")
            }).catch((error)=>{
            setError(true)
    })
    }

  return (
    <div className='signUpScreen'>
      <form>
        {signUp ? <h1>Sign Up</h1> : <h1>Sign In</h1>}
        <input ref={emailRef} type="email" placeholder='Email' />
        <input ref={passwordRef} type="password" placeholder='Password'/>
        { error && <p className="signUpScreen__error">Enter valid credentials</p> }
        { errorMessage && <p className="signUpScreen__error">{errorMessage}</p> }
        {signUp ? <button type='submit' onClick={register}>Sign Up</button> : <button type='submit' onClick={signIn}>Sign In</button>}
        {!signUp && <h4><span className='signUpScreen__grey'>
            New to Netflix?</span> 
            <span className='signUpScreen__link' onClick={()=>setSignUp(true)}> Sign Up now.</span>
            </h4>
        } 
      </form>
    </div>
  )
}

export default Signup
