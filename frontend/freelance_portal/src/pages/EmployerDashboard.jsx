import React, { useState } from 'react';
import { employerAPI } from '../api/API';

function EmployerDashboard() {
  const [jobDetails, setJobDetails] = useState({ freelancer_id: '', payment_amount: '', start_date: '', end_date: '' });
  const [freelancers, setFreelancers] = useState([]);
  const [message, setMessage] = useState('');

  const handleProposeJob = async (e) => {
    e.preventDefault();
    try {
      const response = await employerAPI.proposeJob(jobDetails);
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to propose job');
    }
  };

  const handleFetchFreelancers = async () => {
    try {
      const response = await employerAPI.fetchFreelancers();
      setFreelancers(response.data.proposals);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to fetch freelancers');
    }
  };

  const handleMessageFreelancer = async (freelancerId) => {
    try {
      const response = await employerAPI.messageFreelancer({ freelancer_id: freelancerId, message });
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to send message');
    }
  };

  return (
    <div>
      <h1>Employer Dashboard</h1>
      <form onSubmit={handleProposeJob}>
        <h2>Propose a Job</h2>
        <input
          type="text"
          placeholder="Freelancer ID"
          value={jobDetails.freelancer_id}
          onChange={(e) => setJobDetails({ ...jobDetails, freelancer_id: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Payment Amount"
          value={jobDetails.payment_amount}
          onChange={(e) => setJobDetails({ ...jobDetails, payment_amount: e.target.value })}
          required
        />
        <input
          type="date"
          placeholder="Start Date"
          value={jobDetails.start_date}
          onChange={(e) => setJobDetails({ ...jobDetails, start_date: e.target.value })}
          required
        />
        <input
          type="date"
          placeholder="End Date"
          value={jobDetails.end_date}
          onChange={(e) => setJobDetails({ ...jobDetails, end_date: e.target.value })}
          required
        />
        <button type="submit">Propose Job</button>
      </form>

      <button onClick={handleFetchFreelancers}>Fetch Freelancers</button>
      <ul>
        {freelancers.map((freelancer) => (
          <li key={freelancer.id}>
            {freelancer.username} - {freelancer.email}
            <button onClick={() => handleMessageFreelancer(freelancer.id)}>Message</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployerDashboard;