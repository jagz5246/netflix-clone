import { useEffect } from 'react';
import './App.css';
import Homescreen from './components/Homescreen';
import Profilescreen from './components/Profilescreen';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { auth } from './firebase';
import {useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './redux/userSlice';
import store from './redux/store';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((userAuth)=>{
      if(userAuth){
        //Logged In
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }))
      }
      else{
        //Logged out
        dispatch(logout())
      }
      return unsubscribe;
    })
  }
  , [])
  return (
    
    <div className="app">
      <BrowserRouter basename="/">
        {!user?
        <>
        <Login/>
        </>
        
        :
        (
          <Routes>
          <Route path="/" element={<Homescreen/>}/>  
          <Route path="/profile" element={<Profilescreen/>}/>
        </Routes>
        )}
    </BrowserRouter>
    </div>
  );
}

export default App;
