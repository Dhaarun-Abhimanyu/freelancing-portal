import React from 'react';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    alert('Logged out successfully!');
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Welcome, {user?.username || 'User'}!</h1>
      <p>You are logged in as a {user?.role}.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;