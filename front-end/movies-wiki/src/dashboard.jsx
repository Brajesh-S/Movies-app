import React from 'react';
import { useAuth } from './authContext';

const Dashboard = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
      logout();
    };
    return (
        <div>
            <h1>Welcome to your Dashboard!</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;