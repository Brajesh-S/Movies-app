import React, { useState } from "react";


export const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('')

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPass(e.target.value);
    }; 

    const handleSubmit = (e) => {
        e.preventDefault();
    };    
    
    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
                value={email}
                type="email"
                placeholder="Type..."
                id="email"
                name="email"
                onChange={handleEmailChange}
            />
            <label htmlFor="password">Password</label>
            <input
                value={pass}
                type="password"
                placeholder=""
                id="password" 
                name="password" 
                onChange={handlePasswordChange}
            />
            <button type="submit">Login</button>
        </form>
        <button>Don't have an account? Register here.</button>
    </>
    );
};

  