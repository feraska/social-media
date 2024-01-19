import React, { useRef } from 'react';
import "./register.css"
import axios from 'axios';
import {useNavigate } from "react-router-dom"
const Register = () => {
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const passwordAgain = useRef()
  const navigate = useNavigate()
  const handleClick = async(e) => {
    e.preventDefault()
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
   
        return (
            <div className="login">

              <div className="loginWrapper">

                <div className="loginLeft">
                  <h3 className="loginLogo">Lamasocial</h3>
                  <span className="loginDesc">
                    Connect with friends and the world around you on Lamasocial.
                  </span>
                </div>

                <div className="loginRight">

                  <form className="loginBox" onSubmit={handleClick}>
                    <input 
                    placeholder="Username"
                    className="loginInput"
                    ref={username}
                    required
                     />
                    <input 
                    placeholder="Email" 
                    className="loginInput"
                    ref={email}
                    required
                    type='email'
                     />
                    <input 
                    placeholder="Password" 
                    className="loginInput"
                    ref={password}
                    required
                    type='password' 
                    />
                    <input 
                    placeholder="Password Again" 
                    className="loginInput"
                    ref={passwordAgain}
                    required
                    type='password'
                     />
                    <button className="loginButton">Sign Up</button>
                    <button className="loginRegisterButton">
                      Log into Account
                    </button>
                  </form>

                </div>

              </div>
              
            </div>
    )
}

export default Register;