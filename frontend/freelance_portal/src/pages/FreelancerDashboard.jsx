import React, { useState } from 'react';
import { freelancerAPI } from '../api/API';

function FreelancerDashboard() {
  const [proposalDetails, setProposalDetails] = useState({ employer_id: '', cover_letter: '' });
  const [contractDetails, setContractDetails] = useState({ contract_id: '', freelancer_id: '' });
  const [updateDetails, setUpdateDetails] = useState({ contract_id: '', update_message: '' });

  const handleApplyProposal = async (e) => {
    e.preventDefault();
    try {
      const response = await freelancerAPI.applyProposal(proposalDetails);
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to apply for proposal');
    }
  };

  const handleAcceptContract = async (e) => {
    e.preventDefault();
    try {
      const response = await freelancerAPI.acceptContract(contractDetails);
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to accept contract');
    }
  };

  const handleSendUpdates = async (e) => {
    e.preventDefault();
    try {
      const response = await freelancerAPI.sendUpdates(updateDetails);
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to send updates');
    }
  };

  return (
    <div>
      <h1>Freelancer Dashboard</h1>
      <form onSubmit={handleApplyProposal}>
        <h2>Apply for a Proposal</h2>
        <input
          type="text"
          placeholder="Employer ID"
          value={proposalDetails.employer_id}
          onChange={(e) => setProposalDetails({ ...proposalDetails, employer_id: e.target.value })}
          required
        />
        <textarea
          placeholder="Cover Letter"
          value={proposalDetails.cover_letter}
          onChange={(e) => setProposalDetails({ ...proposalDetails, cover_letter: e.target.value })}
          required
        />
        <button type="submit">Apply</button>
      </form>

      <form onSubmit={handleAcceptContract}>
        <h2>Accept a Contract</h2>
        <input
          type="text"
          placeholder="Contract ID"
          value={contractDetails.contract_id}
          onChange={(e) => setContractDetails({ ...contractDetails, contract_id: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Freelancer ID"
          value={contractDetails.freelancer_id}
          onChange={(e) => setContractDetails({ ...contractDetails, freelancer_id: e.target.value })}
          required
        />
        <button type="submit">Accept Contract</button>
      </form>

      <form onSubmit={handleSendUpdates}>
        <h2>Send Updates</h2>
        <input
          type="text"
          placeholder="Contract ID"
          value={updateDetails.contract_id}
          onChange={(e) => setUpdateDetails({ ...updateDetails, contract_id: e.target.value })}
          required
        />
        <textarea
          placeholder="Update Message"
          value={updateDetails.update_message}
          onChange={(e) => setUpdateDetails({ ...updateDetails, update_message: e.target.value })}
          required
        />
        <button type="submit">Send Update</button>
      </form>
    </div>
  );
}

export default FreelancerDashboard;