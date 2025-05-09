import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSearchParams } from 'react-router-dom';

function Register() {
  const { signup } = useAuth();
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role'); // Get the role from the query parameter
  const [formData, setFormData] = useState({ email: '', username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { ...formData, role }; // Include the role in the data sent to the backend
    const result = await signup(dataToSend);
    if (result.success) {
      alert('Verification code sent to your email.');
    } else {
      alert(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register as {role}</h1>
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;