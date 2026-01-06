import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/nav-logo.svg'
import navProfile from '../../assets/nav-profile.svg'

export const Navbar = ({setToken}) => {
  return (
    <div className='navbar'>
        <img src={navlogo} alt="" className='nav-logo' />
        <div className='navbox'>
          <button className='logout' onClick={()=>setToken('')}>Logout</button>
          <img src={navProfile} alt="" className='nav-profile' />
        </div>
    </div>
  )
}
