import React, {useState} from 'react'
import './NewsLetter.css'

export const NewsLetter = () => {
   const [subscribed, setSubscribed] = useState(false);

  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <div>
         {!subscribed ? (
          <>
             <input type="email" placeholder="Your Email id" />
             <button onClick={() => setSubscribed(true)}>Subscribe</button>
          </>
          ) : (
          <p className='subscribep'>Thanks for subscribing 🙌</p>
         )}
      </div>
    </div>
  )
}
