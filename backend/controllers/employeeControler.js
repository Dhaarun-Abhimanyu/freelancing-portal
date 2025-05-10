const Contract = require('../models/Contract');
const Proposal = require('../models/Proposal');


module.exports = {

  proposeJob: async (req, res) => {
    try {
      const { freelancer_id, payment_amount, start_date, end_date } = req.body;
      const contract = await Contract.create({
        freelancer_id,
        payment_amount,
        start_date,
        end_date,
        contract_status: 'proposed'
      });
      res.status(201).json({ message: 'Job proposed and contract created', contract });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error proposing job', error: error.message });
    }
  },


    fetchFreelancers: async (req, res) => {
        try {
            const { employer_id } = req.body;
            const proposals = await Proposal.findAll({
                where: { employer_id }
            });
            res.status(200).json({ message: 'Freelancers fetched', proposals });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching freelancers', error: error.message });
        }
    },

  acceptFreelancer: async (req, res) => {
    try {
      const { contract_id, freelancer_id } = req.body;
      const updated = await Contract.update(
        { contract_status: 'accepted_by_employer' },
        { where: { contract_id, freelancer_id } }
      );
      res.status(200).json({ message: 'Freelancer accepted and contract sent', updated });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error accepting freelancer', error: error.message });
    }
  },

  receiveUpdates: async (req, res) => {
    try {
      const { contract_id, update_message } = req.body;
      // In a real-world app, save the update in a ProjectUpdates table
      console.log(`Update for contract ${contract_id}: ${update_message}`);
      res.status(200).json({ message: 'Update received', contract_id, update_message });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error receiving update', error: error.message });
    }
  },

  messageFreelancer: async (req, res) => {
    try {
      const { freelancer_id, message_text } = req.body;
      console.log(`Message to Freelancer ${freelancer_id}: ${message_text}`);
      res.status(200).json({ message: 'Message sent to freelancer', freelancer_id, message_text });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error sending message', error: error.message });
    }
  }
};
