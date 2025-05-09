import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Welcome to the Freelancing Portal</h1>
      <p>Choose your role to register:</p>
      <div>
        <Link to="/register?role=freelancer">
          <button>Register as Freelancer</button>
        </Link>
        <Link to="/register?role=employer">
          <button>Register as Employer</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;