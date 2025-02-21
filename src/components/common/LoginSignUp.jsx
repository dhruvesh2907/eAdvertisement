import React, { useState } from 'react'
import './LoginSignUp.css'
import user_icon from './person.png'
import email_icon from './email.png'
import password_icon from './password.png'



 const LoginSignUp = () => {

    const [action,setAction] = useState("Sign Up");


  return (
    <div className=" container d-flex justify-content-center align-items-center vh-100"
    style={{
      background: "linear-gradient(to top, #1c1c1c, #623AA2, #E96479)",
    }}>
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            {action==="Login"?<div></div>: <div className="input">
                <img src={user_icon} alt="" />
                <input type="text" placeholder="Enter Name" />
            </div>}
           
            <div className="input">
                <img src={email_icon} alt="" />
                <input type="email" placeholder="Enter E-mail" />
            </div>
            <div className="input">
                <img src={password_icon} alt="" />
                <input type="password" placeholder="Enter Password"/>
            </div>
        </div>
        {action==="Sign Up"?<div></div>:<div className="forgot-password">Lost Password? <span>Click Here!</span></div>}
        
        <div className="submit-container">
            <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
            <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
        </div>
    </div>
  );
}

export default LoginSignUp
