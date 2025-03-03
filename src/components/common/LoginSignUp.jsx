import React, { useState } from 'react';
import axios from 'axios';
import './LoginSignUp.css';
import user_icon from './person.png';
import email_icon from './email.png';
import password_icon from './password.png';
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';


const LoginSignUp = () => {
  const [action, setAction] = useState("Sign Up");
  const [formData, setFormData] = useState({ firstName: "", lastName: "", age: "", email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (action === "Sign Up") {
        formData.roleId = "67bd3f8a8717278a8401f812"; // Default role assignment
        const res = await axios.post("/user", formData);
        console.log(res.data);
        if (res.status === 201) {
          // alert("User registered successfully!");
          toast.error('User registered successfully!', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
           
        
        } else {
            //alert("Signup failed. Please try again.");
            toast.error('Signup failed. Please try again.', {
              position: "top-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
              });
            
        }
      } else {
        const res = await axios.post("/user/login", {
          email: formData.email,
          password: formData.password,
        });
        console.log(res.data);
        if (res.status === 200) {
          //alert("Login successful!");
          toast.error('Login successful!', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
          localStorage.setItem("id",res.data.data._id)
          localStorage.setItem("role",res.data.data.roleId.name)
          if(res.data.data.roleId.name === "USER"){
            navigate("/user") //check in app.js
          }
        } else {
          //alert("Login failed. Please check your credentials.");
          toast.error('Login failed. Please check your credentials.', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  
    
    return (
      <div
        className="container d-flex justify-content-center align-items-center vh-100"
        style={{ background: "linear-gradient(to top, #1c1c1c, #623AA2, #E96479)" }}
      >
        <div style={{ textAlign: "center", backgroundColor: "white" }}>
          <ToastContainer
            position="top-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />
        </div>
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action === "Login" ? null : (
            <>
              <div className="input">
                <img src={user_icon} alt="" />
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <img src={user_icon} alt="" />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="input">
                <img src={user_icon} alt="" />
                <input
                  type="number"
                  name="age"
                  placeholder="Enter Age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="email"
              name="email"
              placeholder="Enter E-mail"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>
        {action === "Sign Up" ? null : (
          <div className="forgot-password">
            Lost Password? <span>Click Here!</span>
          </div>
        )}
  
        <div className="submit-container">
          <div 
            className={action === "Sign Up" ? "submit" : "submit gray"} 
            onClick={() => setAction("Sign Up")}
          >
            Sign Up
          </div>
          <div 
            className={action === "Login" ? "submit" : "submit gray"} 
            onClick={() => setAction("Login")}
          >
            Login
          </div>
        </div>
        <div className="submit" onClick={handleSubmit}>Submit</div>
      </div>
    );
  };
  
  export default LoginSignUp;
  