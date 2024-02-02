import React, { useEffect, useState } from 'react'
import '../styles/Nav.css'
import logo from '../images/Logonetflix.png'
import { useNavigate } from 'react-router-dom'
const Nav = () => {
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const transitionNavbar=()=>{
        if (window.scrollY > 100){
            setShow(true)
        }
        else{
            setShow(false)
        }
    }
    useEffect(()=>{
        window.addEventListener('scroll', transitionNavbar)
        return ()=> window.removeEventListener('scroll', transitionNavbar)
    }, [])
  return (
    <div className={`nav ${show && "nav__black"}`}>
        <div className="nav__contents">
             <img className='nav__logo'
                src={logo} onClick={()=> navigate('/')} alt="logo" />
             <img className='nav__avatar'
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="avatar" 
                onClick={()=> navigate('/profile')}
                />
        </div>
    </div>
  )
}

export default Nav
