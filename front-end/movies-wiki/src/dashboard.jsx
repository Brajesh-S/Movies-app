import React, { useState, useEffect } from 'react';
import { useAuth } from './authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css';

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    if (e) {
      e.preventDefault();
    }
    axios
      .get('/search', {
        params: {
          query: searchTerm,
        },
      })
      .then((response) => setMovies(response.data))
      .catch((error) => {
        // Handle error
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div>
      <header>
        <input
          type="text"
          className="search"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>
      {movies.length > 0 ? (
        <div className="movie-container">
          {movies.map((movie) => (
            // Render movie information here
            <div key={movie.id}>{movie.title}</div>
          ))}
        </div>
      ) : (
        <h1 className="no-results">No Results Found</h1>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
