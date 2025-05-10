const express = require('express');
const router = express.Router();
const employeeControler = require('../controllers/employeeControler');

router.post('/propose-job', employeeControler.proposeJob);
router.get('/freelancers', employeeControler.fetchFreelancers);
router.post('/accept-freelancer', employeeControler.acceptFreelancer);
router.post('/receive-updates', employeeControler.receiveUpdates);
router.post('/message-freelancer', employeeControler.messageFreelancer);
module.exports = router;