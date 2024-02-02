import React, { useEffect, useRef, useState } from 'react'
import db from '../firebase.js'
import '../styles/PlansScreen.css'
import { Firestore, setDoc } from 'firebase/firestore'
import {selectUser} from '../redux/userSlice'
import { useSelector } from 'react-redux';
import { doc, getDoc, getDocs, querySnapshot, onSnapshot, collection, query, where, addDoc, snapshotEqual, DocumentReference } from "firebase/firestore";
import { loadStripe } from '@stripe/stripe-js';
import Loader from './Loader.jsx'
import { auth } from '../firebase'




const PlansScreen = () => {
    const [plans, setPlans] = useState([])
    const user = useSelector(selectUser)
    const [subscription, setSubscription] = useState(null)
    const [loading, setLoading] = useState(false)

    //To get the current subscription details
    useEffect(()=>{
        const subRef = query(collection(db,`customers`, user.uid, 'subscriptions'));
        const unsub = onSnapshot(subRef, async(querySnapshot)=>{
            querySnapshot.forEach(async subscription=>{
                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,
                })
            })
        })
        return ()=> unsub();
    },[user.uid])

    //To get the plans 
    useEffect(() => {
        setLoading(true)
        const q = query(collection(db, "products"), where("active", "==", true));
        const unsub = onSnapshot(q, async (querySnapshot) => {
          const products = {};
          for (const productDoc of querySnapshot.docs) {
            products[productDoc.id] = productDoc.data();
            const priceSnap = await getDocs(collection(productDoc.ref, "prices"));
            for (const price of priceSnap.docs) {
              products[productDoc.id].price = {
                priceId: price.id,
                priceData: price.data(),
              };
            }
          }
          setPlans(products);
          setLoading(false)
        });
        return () => unsub();
      }, []);
      console.log('plans:',plans)
      console.log('Subscription:',subscription)

      //checkout function
    const loadCheckout =async(priceId)=> {

        const docRef = await collection(db, `customers`, user.uid, 'checkout_sessions');
        await setDoc(doc(docRef),{
            price: priceId,
            success_url: "https://jagz5246.github.io/netflix-clone/",
            cancel_url: "https://jagz5246.github.io/netflix-clone/",
        })    
        onSnapshot(docRef, (snap)=>{
          snap.forEach(async(session) => {
            const { created } = await session.data()
            if(created){
              console.log(created.seconds)
              const createdTime =  new Date(created.seconds * 1000);
              const current_date = new Date()
              console.log(current_date.getSeconds() - createdTime.getSeconds())
              if (current_date.getSeconds() - createdTime.getSeconds() === 0){
                // console.log('current-session-id:',session.data().sessionId, 'url:',session.data().url)
                try{
                      const { sessionId, url } = session.data()
                      if(sessionId){
                        const stripe = await loadStripe('pk_test_51OeYWdSDuldtUEWUIx4Fgnf055YZWfjzE0B04fE8NLptelLONj1uDlN5VJUg4uqM1FTSLvlPrJKePTcNiSKllgy500ylzrPJ4T');
                        stripe.redirectToCheckout({ sessionId })
                        setLoading(true)
                        }
                      }
                    catch(error){
                      console.log(error)
                      }
              }
            }
       
          })
        })
        
    }
  return (
    <div className='planScreen'>
        <br />
       {loading ? <Loader /> :  <div>
        {subscription && <p className='plansScreen__renewal'>Renewal date: {new Date(subscription?.
        current_period_end * 1000).toLocaleDateString()
        }</p>}
      {Object.entries(plans).map(([planId, planData])=>{
        //logic to check if user's subscription is active...
        const isCurrentPlan = planData.name?.toLowerCase().includes(subscription?.role);


        return(
            <div key={planId} className={`${isCurrentPlan && "plansScreen__plan--disabled"} plansScreen__plan`}>
                <div className="plansScreen__info">
                    <h5>{planData.name}</h5>
                    <h6>{planData.description}</h6>
                </div>
                <button 
                onClick={()=> !isCurrentPlan && loadCheckout(planData.price.priceId)}>
                    {isCurrentPlan? "Current plan" : "Subscribe"}
                </button>
            </div>
        )
      })}
      <button className="profileScreen__signout"
        onClick={()=>auth.signOut()}>Sign Out</button>
      </div>}
    </div>
  )
}

export default PlansScreen



