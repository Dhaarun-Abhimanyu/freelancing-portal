import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">Welcome to the Freelancing Portal</h1>
        <p className="landing-subtitle">Choose your role to register or log in:</p>
        <div className="landing-buttons">
          <Link to="/register?role=freelancer">
            <button className="landing-button freelancer">Register as Freelancer</button>
          </Link>
          <Link to="/register?role=employer">
            <button className="landing-button employer">Register as Employer</button>
          </Link>
          <Link to="/login">
            <button className="landing-button login">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;