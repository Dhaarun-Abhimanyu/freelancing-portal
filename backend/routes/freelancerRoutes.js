const express = require('express');
const router = express.Router();
const freelancerController = require('../controllers/freelancerController');

router.post('/apply-proposal', freelancerController.applyProposal);
router.post('/accept-contract', freelancerController.acceptContract);
router.post('/send-updates', freelancerController.sendUpdates);
router.post('/message-employer', freelancerController.messageEmployer);
module.exports = router;