const Proposal = require('../models/Proposal');
const Contract = require('../models/Contract');

module.exports = {
    applyProposal: async (req, res) => {
        try {
            const { employer_id, freelancer_id, cover_letter } = req.body;
            const proposal = await Proposal.create({
                employer_id,
                cover_letter,
                freelancer_id
            });
            res.status(201).json({ message: 'Proposal applied successfully', proposal });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error applying proposal', error: error.message });
        }
    },

    acceptContract: async (req, res) => {
        try {
            const { contract_id, freelancer_id } = req.body;
            const updated = await Contract.update(
                { contract_status: 'accepted_by_freelancer' },
                { where: { contract_id, freelancer_id } }
            );
            res.status(200).json({ message: 'Contract accepted', updated });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error accepting contract', error: error.message });
        }
    },

    sendUpdates: async (req, res) => {
        try {
            const { contract_id, update_message } = req.body;
            console.log(`Freelancer update for contract ${contract_id}: ${update_message}`);
            res.status(200).json({ message: 'Update sent', contract_id, update_message });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error sending update', error: error.message });
        }
    },

    messageEmployer: async (req, res) => {
        try {
            const { employer_id, message_text } = req.body;
            console.log(`Message to Employer ${employer_id}: ${message_text}`);
            res.status(200).json({ message: 'Message sent to employer', employer_id, message_text });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error sending message', error: error.message });
        }
    }
};