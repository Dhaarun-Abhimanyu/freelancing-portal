import React, { useState, useEffect } from 'react';
import { freelancerAPI } from '../api/API';
import './Dashboard.css';

function FreelancerDashboard() {
  const [availableProposals, setAvailableProposals] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [applicationText, setApplicationText] = useState('');
  
  useEffect(() => {
    fetchAvailableProposals();
    fetchMyApplications();
  }, []);

  const fetchAvailableProposals = async () => {
    try {
      // This would need to be implemented in the backend
      const response = await freelancerAPI.getAvailableProposals();
      setAvailableProposals(response.data.proposals);
    } catch (error) {
      console.error('Failed to fetch proposals:', error);
    }
  };

  const fetchMyApplications = async () => {
    try {
      // This would need to be implemented in the backend
      const response = await freelancerAPI.getMyApplications();
      setMyApplications(response.data.applications);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    }
  };

  const handleApply = async (proposalId) => {
    try {
      await freelancerAPI.applyProposal({
        proposal_id: proposalId,
        cover_letter: applicationText
      });
      setApplicationText('');
      fetchMyApplications();
    } catch (error) {
      console.error('Failed to apply:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Freelancer Dashboard</h1>
      </div>

      <div className="dashboard-content">
        <section className="available-proposals-section">
          <h2>Available Projects</h2>
          <div className="proposals-grid">
            {availableProposals.map((proposal) => (
              <div key={proposal.id} className="proposal-card">
                <h3>{proposal.title}</h3>
                <p>{proposal.description}</p>
                <div className="proposal-details">
                  <span>Budget: ${proposal.budget}</span>
                  <span>Deadline: {new Date(proposal.deadline).toLocaleDateString()}</span>
                </div>
                <div className="application-form">
                  <textarea
                    placeholder="Why are you a good fit for this project?"
                    value={applicationText}
                    onChange={(e) => setApplicationText(e.target.value)}
                  />
                  <button onClick={() => handleApply(proposal.id)} className="apply-button">
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="my-applications-section">
          <h2>My Applications</h2>
          <div className="applications-grid">
            {myApplications.map((application) => (
              <div key={application.id} className="application-card">
                <h3>{application.proposal.title}</h3>
                <p>Status: {application.status}</p>
                <div className="application-details">
                  <p>Your Cover Letter:</p>
                  <p className="cover-letter">{application.cover_letter}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default FreelancerDashboard;