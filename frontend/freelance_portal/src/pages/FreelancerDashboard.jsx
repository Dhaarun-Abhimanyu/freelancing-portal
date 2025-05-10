import React, { useState } from 'react';
import { freelancerAPI } from '../api/API';
import './Dashboard.css';

function FreelancerDashboard() {
  const [proposalDetails, setProposalDetails] = useState({
    employer_id: '',
    cover_letter: ''
  });
  const [contractDetails, setContractDetails] = useState({
    contract_id: '',
    freelancer_id: ''
  });
  const [updateDetails, setUpdateDetails] = useState({
    contract_id: '',
    update_message: ''
  });

  const handleApplyProposal = async (e) => {
    e.preventDefault();
    try {
      const response = await freelancerAPI.applyProposal(proposalDetails);
      alert(response.data.message);
      setProposalDetails({ employer_id: '', cover_letter: '' });
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to apply for proposal');
    }
  };

  const handleAcceptContract = async (e) => {
    e.preventDefault();
    try {
      const response = await freelancerAPI.acceptContract(contractDetails);
      alert(response.data.message);
      setContractDetails({ contract_id: '', freelancer_id: '' });
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to accept contract');
    }
  };

  const handleSendUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await freelancerAPI.sendUpdates(updateDetails);
      alert(response.data.message);
      setUpdateDetails({ contract_id: '', update_message: '' });
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to send update');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Freelancer Dashboard</h1>
      </div>

      <div className="dashboard-content">
        <section className="proposal-section">
          <h2>Apply for a Project</h2>
          <form onSubmit={handleApplyProposal} className="proposal-form">
            <div className="form-group">
              <label>Employer ID</label>
              <input
                type="text"
                value={proposalDetails.employer_id}
                onChange={(e) => setProposalDetails({ ...proposalDetails, employer_id: e.target.value })}
                placeholder="Enter employer ID"
                required
              />
            </div>
            <div className="form-group">
              <label>Cover Letter</label>
              <textarea
                value={proposalDetails.cover_letter}
                onChange={(e) => setProposalDetails({ ...proposalDetails, cover_letter: e.target.value })}
                placeholder="Write your cover letter"
                required
              />
            </div>
            <button type="submit" className="submit-button">Submit Proposal</button>
          </form>
        </section>

        <section className="contract-section">
          <h2>Accept Contract</h2>
          <form onSubmit={handleAcceptContract} className="proposal-form">
            <div className="form-group">
              <label>Contract ID</label>
              <input
                type="text"
                value={contractDetails.contract_id}
                onChange={(e) => setContractDetails({ ...contractDetails, contract_id: e.target.value })}
                placeholder="Enter contract ID"
                required
              />
            </div>
            <div className="form-group">
              <label>Freelancer ID</label>
              <input
                type="text"
                value={contractDetails.freelancer_id}
                onChange={(e) => setContractDetails({ ...contractDetails, freelancer_id: e.target.value })}
                placeholder="Enter your freelancer ID"
                required
              />
            </div>
            <button type="submit" className="submit-button">Accept Contract</button>
          </form>
        </section>

        <section className="updates-section">
          <h2>Send Project Update</h2>
          <form onSubmit={handleSendUpdate} className="proposal-form">
            <div className="form-group">
              <label>Contract ID</label>
              <input
                type="text"
                value={updateDetails.contract_id}
                onChange={(e) => setUpdateDetails({ ...updateDetails, contract_id: e.target.value })}
                placeholder="Enter contract ID"
                required
              />
            </div>
            <div className="form-group">
              <label>Update Message</label>
              <textarea
                value={updateDetails.update_message}
                onChange={(e) => setUpdateDetails({ ...updateDetails, update_message: e.target.value })}
                placeholder="Write your project update"
                required
              />
            </div>
            <button type="submit" className="submit-button">Send Update</button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default FreelancerDashboard;