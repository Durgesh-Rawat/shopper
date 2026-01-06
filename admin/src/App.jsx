import React from 'react'
import { Navbar } from './Components/Navbar/Navbar'
import {Admin} from './Pages/Admin/Admin'
import { useState } from 'react'
import { Loginsignup } from './Pages/Admin/Loginsignup'
import { useEffect } from 'react'

export const backendUrl = import.meta.env.VITE_BACKEND_URL

export const App = () => {
  
  const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):"");

  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])

  return (
    <>
      {token === "" ? <Loginsignup setToken={setToken}/> : 
       <div>
         <Navbar setToken={setToken}/>
         <Admin token={token}/>
      </div>}
    </>
  )
}
