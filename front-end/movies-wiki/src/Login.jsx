import React, { useState } from "react";
import { useAuth } from './authContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';





export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    
    const navigate = useNavigate();
    const { setToken } = useAuth();
    

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }; 
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
     
    const userData = {
        email,
        password,
      };
      await handleLogin(userData);
    };  

    // Login.jsx

const handleLogin = async (userData) => {
    try {
        console.log('Sending user data:', userData); 
        const response = await axios.post('http://localhost:3000/api/auth/login', userData,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
      console.log(response);
         
         
    if (response.status === 200) {
        const responseData = response.data;
  
        
        if (responseData.error === false && responseData.data && responseData.data.accessToken) {
          console.log('Login successful.');
  
          setToken(responseData.data.accessToken);  
          navigate('/Dashboard');
        } else {
          
          console.error('Login failed:', responseData.message);
        }
      } else {
        
        console.error('Unexpected status code:', response.status);
      }
    } catch (error) {
      
      console.error('Login failed. An error occurred:', error.message);
    }   
  };
  
    return (
      <div className="login-page">
        <img className="fullscreen-bg-img" src={require("./homepage.jpg")} alt=""/>

        <div className="login-image">
          <img src={require("./Image.png")} alt=""/>
        </div>

        <div className = "auth-form-container">
{/* 
        <img src={require("./Image(7).png")} alt=""/> */}
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email" className="form-label">Email</label>
            <input className="form-input"
                value={email}
                type="email"
                placeholder=""
                id="email"
                name="email"
                onChange={handleEmailChange}
                autoComplete="email"
            />
            <label htmlFor="password">Password</label>
            <input className="form-input"
                value={password}
                type="password"
                placeholder=""
                id="password" 
                name="password" 
                onChange={handlePasswordChange}
                autoComplete="current-password"
            />
            <button type="submit" className="submit-button">Login</button>
        </form>
        
        <button onClick={() => navigate('/register')} className="register-button">Don't have an account? Register here. </button>
        </div>
    </div>
    );
};

  