import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { Login } from "./Login";
import { Register } from "./Register";
import Dashboard from './dashboard';

function App() {
  const [currentForm, setCurrentForm] = useState("login"); // Default to login
  const [data, setData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const toggleForm = (formName) => {
    // Toggle between login and register forms
    setCurrentForm(formName);
  };


  
  useEffect(() => {
    axios.get('http://localhost:3000')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []); 

  useEffect(() => {
    // Check if an access token exists in client-side storage
    const token = localStorage.getItem('accessToken');
    if (token) {
      setLoggedIn(true);
    }
  }, []); 


  return (
    <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      /* <BrowserRouter> {
        <Routes>
          <Route
            path="/login"
            element={loggedIn ? <Navigate to="/dashboard" /> : <Login currentForm={currentForm} onFormSwitch={toggleForm} />}
          />
          <Route
            path="/register"
            element={<Register onFormSwitch={toggleForm} />}
          />
          <Route
            path="/"
            element={loggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
        }
      </BrowserRouter> */}
      
    {/* <div>
      {data.map(item => (
        <div key={item._id}>
          <h3>{item.name}</h3>
          <p>{item.email}</p>
        </div>
      ))}
    </div> */}
</div>
  );
}

export default App;


