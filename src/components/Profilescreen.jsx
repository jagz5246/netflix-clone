import React from 'react'
import '../styles/Profilescreen.css'
import Nav from '../components/Nav'
import { useSelector } from 'react-redux'
import {selectUser} from '../redux/userSlice'
import { auth } from '../firebase'
import PlansScreen from './PlansScreen'

const Profilescreen = () => {
    const user = useSelector(selectUser)

  return (
    <div className='profileScreen'>
     <Nav/> 
     <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__info">
            <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="avatar"/>
            <div className="profileScreen__details">
                <h2>{user.email}</h2>
                <div className="profileScreen__plans">
                    <h3>Plans</h3>
                    <PlansScreen />

                </div>
            </div>
        </div>
     </div>
    </div>
  )
}

export default Profilescreen
