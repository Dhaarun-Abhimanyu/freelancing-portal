import React, { useState, useEffect } from 'react';
import { employerAPI } from '../api/API';
import './Dashboard.css';

function EmployerDashboard() {
  const [jobDetails, setJobDetails] = useState({
    freelancer_id: '',
    payment_amount: '',
    start_date: '',
    end_date: ''
  });
  const [freelancers, setFreelancers] = useState([]);
  const [messageDetails, setMessageDetails] = useState({
    freelancer_id: '',
    message_text: ''
  });

  useEffect(() => {
    fetchFreelancers();
  }, []);

  const fetchFreelancers = async () => {
    try {
      const response = await employerAPI.fetchFreelancers();
      setFreelancers(response.data.proposals || []);
    } catch (error) {
      console.error('Failed to fetch freelancers:', error);
    }
  };

  const handleProposeJob = async (e) => {
    e.preventDefault();
    try {
      const response = await employerAPI.proposeJob(jobDetails);
      alert(response.data.message);
      setJobDetails({ freelancer_id: '', payment_amount: '', start_date: '', end_date: '' });
      fetchFreelancers();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to propose job');
    }
  };

  const handleMessageFreelancer = async (e) => {
    e.preventDefault();
    try {
      const response = await employerAPI.messageFreelancer(messageDetails);
      alert(response.data.message);
      setMessageDetails({ freelancer_id: '', message_text: '' });
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to send message');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Employer Dashboard</h1>
      </div>

      <div className="dashboard-content">
        <section className="job-proposal-section">
          <h2>Create Job Proposal</h2>
          <form onSubmit={handleProposeJob} className="proposal-form">
            <div className="form-group">
              <label>Freelancer ID</label>
              <input
                type="text"
                value={jobDetails.freelancer_id}
                onChange={(e) => setJobDetails({ ...jobDetails, freelancer_id: e.target.value })}
                placeholder="Enter freelancer ID"
                required
              />
            </div>
            <div className="form-group">
              <label>Payment Amount ($)</label>
              <input
                type="number"
                value={jobDetails.payment_amount}
                onChange={(e) => setJobDetails({ ...jobDetails, payment_amount: e.target.value })}
                placeholder="Enter payment amount"
                min="1"
                required
              />
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                value={jobDetails.start_date}
                onChange={(e) => setJobDetails({ ...jobDetails, start_date: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                value={jobDetails.end_date}
                onChange={(e) => setJobDetails({ ...jobDetails, end_date: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="submit-button">Create Proposal</button>
          </form>
        </section>

        <section className="freelancers-section">
          <h2>Available Freelancers</h2>
          <div className="proposals-grid">
            {freelancers.map((freelancer) => (
              <div key={freelancer.proposal_id} className="proposal-card">
                <h3>{freelancer.cover_letter}</h3>
                <div className="proposal-details">
                  <span>Status: {freelancer.status}</span>
                  <span>Applied: {new Date(freelancer.applied_date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="message-section">
          <h2>Message Freelancer</h2>
          <form onSubmit={handleMessageFreelancer} className="proposal-form">
            <div className="form-group">
              <label>Freelancer ID</label>
              <input
                type="text"
                value={messageDetails.freelancer_id}
                onChange={(e) => setMessageDetails({ ...messageDetails, freelancer_id: e.target.value })}
                placeholder="Enter freelancer ID"
                required
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                value={messageDetails.message_text}
                onChange={(e) => setMessageDetails({ ...messageDetails, message_text: e.target.value })}
                placeholder="Write your message"
                required
              />
            </div>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default EmployerDashboard;