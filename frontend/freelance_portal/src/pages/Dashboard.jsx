import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'employer') {
      navigate('/employer-dashboard');
    } else if (user?.role === 'freelancer') {
      navigate('/freelancer-dashboard');
    } else {
      navigate('/login'); // Redirect to login if no valid role is found
    }
  }, [user, navigate]);

  return null; // No UI is needed here since it redirects immediately
}

export default Dashboard;