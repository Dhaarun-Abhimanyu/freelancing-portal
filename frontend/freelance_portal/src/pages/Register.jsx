import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSearchParams } from 'react-router-dom';
import './Register.css';

function Register() {
  const { signup, verifySecurityCode } = useAuth();
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role'); // Get the role from the query parameter
  const [formData, setFormData] = useState({ email: '', username: '', password: '' });
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationStep, setIsVerificationStep] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const dataToSend = { ...formData, role }; // Include the role in the data sent to the backend
    const result = await signup(dataToSend);
    if (result.success) {
      alert('Verification code sent to your email.');
      setIsVerificationStep(true);
    } else {
      alert(result.message);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    const result = await verifySecurityCode({ email: formData.email, code: verificationCode });
    if (result.success) {
      alert('Verification successful! You can now log in.');
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="register-container">
      {!isVerificationStep ? (
        <form onSubmit={handleSignup} className="register-form">
          <h1>Register as {role}</h1>
          <input name="email" placeholder="Email" onChange={handleChange} required />
          <input name="username" placeholder="Username" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Register</button>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode} className="verification-form">
          <h1>Verify Your Email</h1>
          <p>Enter the verification code sent to your email:</p>
          <input
            name="verificationCode"
            placeholder="Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
          <button type="submit">Verify</button>
        </form>
      )}
    </div>
  );
}

export default Register;