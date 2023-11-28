import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('');

    const navigate = useNavigate();
   

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const userData = {
            firstName:firstName,
            lastName:lastName,
            email:email,
            password: pass, 
          };   
    
          axios.post('http://localhost:3000/api/auth/register', userData)
          .then(response => {
            console.log(response.data);
            
          })
          .catch(error => {
            if (error.response) {
              console.error('Response Data:', error.response.data);
              console.error('Response Status:', error.response.status);
            } else if (error.request) {
              console.error('No response received:', error.request);
            } else {
              console.error('Error:', error.message);
            }
          });
    };

    return (
        <div className = "auth-form-container">
            
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">First name </label>
                <input
                    value = {firstName}
                    type = "text"
                    placeholder = ""
                    id = "name"
                    name = "name"
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor="name">Last name</label>
                <input
                    value = {lastName}
                    type = "text"
                    placeholder = ""
                    id = "name"
                    name = "name"
                    onChange={(e) => setLastName(e.target.value)}
                />
                

                <label htmlFor="email">Email</label>
                <input
                    value = {email}
                    type = "email"
                    placeholder = ""
                    id = "email"
                    name = "email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Password</label>
                <input
                    value = {pass}
                    type = "password"
                    placeholder = ""
                    id = "password" 
                    name = "password"
                    onChange={(e) => setPass(e.target.value)} 
                />
                <button type="submit">Register</button>
            </form>
            
       
            <button onClick={() => navigate('/')}>Already have an account? Login here.</button>

            </div>
            )
    }