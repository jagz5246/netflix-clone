import React, { useRef, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    //User authentication states
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const [error, setError] = useState(false)
    
    //Register function
    const register = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(
            auth,
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser)=>{
            console.log(authUser)
        }).catch((error)=>{
          setError(true)
          alert('Invalid credentials: ',error.message)
        })
    };


  return (
    <div className='signUpScreen'>
      <form>
        <h1>Sign Up</h1>
        <input ref={emailRef} type="email" placeholder='Email' />
        <input ref={passwordRef} type="password" placeholder='Password'/>
        { error && <p className="signUpScreen__error">Enter valid credentials</p> }
        <button type='submit' onClick={register}>Sign Up</button>
      </form>
    </div>
  )
}


export default Register
