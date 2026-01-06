import React,{useState} from 'react'
import './Loginsignup.css'
import { backendUrl } from '../../App';

export const Loginsignup = ({setToken}) => {

 const [email,setEmail] = useState('');
 const [password,setPassword] = useState('');

const onSubmitHandler = async() => {
 try{
   const res = await fetch(`${backendUrl}/api/adminlogin/admin`,{
        method:"POST",
        headers:{
             Accept:'application/json',
            'Content-Type':'application/json',
        },
        body:JSON.stringify({email,password}),
    });

    const data = await res.json();

    if(res.ok){
      setToken(data.token)
    }else{
        alert(data.message || "Login Error");
    }
  }catch(error){
    console.error(error);
    alert("Server error");
  }
}

  return (
      <div className="login-page">
         <div className="login-card">
            <h2>Login</h2>
            <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" required/>
            <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" required/>
            <button onClick={onSubmitHandler}>Login</button>
        </div>
     </div>
  )
}
