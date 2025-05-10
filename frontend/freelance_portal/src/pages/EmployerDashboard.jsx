import React, { useState, useEffect } from 'react';
import { employerAPI } from '../api/API';
import './Dashboard.css';

function EmployerDashboard() {
  const [proposals, setProposals] = useState([]);
  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: ''
  });

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      const response = await employerAPI.fetchFreelancers();
      setProposals(response.data.proposals);
    } catch (error) {
      console.error('Failed to fetch proposals:', error);
    }
  };

  const handleSubmitProposal = async (e) => {
    e.preventDefault();
    try {
      await employerAPI.proposeJob({
        ...newProposal,
        payment_amount: parseFloat(newProposal.budget),
        start_date: new Date().toISOString(),
        end_date: new Date(newProposal.deadline).toISOString()
      });
      setNewProposal({ title: '', description: '', budget: '', deadline: '' });
      fetchProposals();
    } catch (error) {
      console.error('Failed to create proposal:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Employer Dashboard</h1>
      </div>

      <div className="dashboard-content">
        <section className="create-proposal-section">
          <h2>Create New Proposal</h2>
          <form onSubmit={handleSubmitProposal} className="proposal-form">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={newProposal.title}
                onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })}
                placeholder="Project Title"
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={newProposal.description}
                onChange={(e) => setNewProposal({ ...newProposal, description: e.target.value })}
                placeholder="Project Description"
                required
              />
            </div>

            <div className="form-group">
              <label>Budget ($)</label>
              <input
                type="number"
                value={newProposal.budget}
                onChange={(e) => setNewProposal({ ...newProposal, budget: e.target.value })}
                placeholder="Budget"
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label>Deadline</label>
              <input
                type="date"
                value={newProposal.deadline}
                onChange={(e) => setNewProposal({ ...newProposal, deadline: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="submit-button">Create Proposal</button>
          </form>
        </section>

        <section className="proposals-list-section">
          <h2>Your Proposals</h2>
          <div className="proposals-grid">
            {proposals.map((proposal) => (
              <div key={proposal.id} className="proposal-card">
                <h3>{proposal.title}</h3>
                <p>{proposal.description}</p>
                <div className="proposal-details">
                  <span>Budget: ${proposal.payment_amount}</span>
                  <span>Status: {proposal.status}</span>
                </div>
                <div className="proposal-actions">
                  <button className="view-button">View Applications</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default EmployerDashboard;