const express = require('express');
const router = express.Router();
const employeeControler = require('../controllers/employeeControler');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/propose-job', authMiddleware, employeeControler.proposeJob);
router.get('/freelancers', authMiddleware, employeeControler.fetchFreelancers);
router.post('/accept-freelancer', authMiddleware, employeeControler.acceptFreelancer);
router.post('/receive-updates', authMiddleware, employeeControler.receiveUpdates);
router.post('/message-freelancer', authMiddleware, employeeControler.messageFreelancer);
module.exports = router;
