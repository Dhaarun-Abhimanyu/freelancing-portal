const express = require('express');
const router = express.Router();
const employeeControler = require('../controllers/employeeControler');
const { authMiddleware } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Employer
 *   description: Employer related endpoints
 */

/**
 * @swagger
 * /api/employer/propose-job:
 *   post:
 *     summary: Propose a job and create a contract.
 *     tags: [Employer]
 *     requestBody:
 *       description: Job proposal details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               freelancer_id:
 *                 type: integer
 *               payment_amount:
 *                 type: number
 *               start_date:
 *                 type: string
 *                 format: date-time
 *               end_date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Job proposed and contract created. Returns a message with contract details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Job proposed and contract created
 *                 contract:
 *                   type: object
 */
router.post('/propose-job', employeeControler.proposeJob);

/**
 * @swagger
 * /api/employer/freelancers:
 *   get:
 *     summary: Get freelancers who applied for a job.
 *     tags: [Employer]
 *     parameters:
 *       - in: query
 *         name: employer_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Employer ID
 *     responses:
 *       200:
 *         description: Freelancers fetched. Returns a message with proposals.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Freelancers fetched
 *                 proposals:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get('/freelancers', employeeControler.fetchFreelancers);

/**
 * @swagger
 * /api/employer/accept-freelancer:
 *   post:
 *     summary: Accept a freelancer and send contract details.
 *     tags: [Employer]
 *     requestBody:
 *       description: Freelancer acceptance details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contract_id:
 *                 type: number
 *               freelancer_id:
 *                 type: number
 *     responses:
 *       200:
 *         description: Freelancer accepted and contract details sent. Returns a message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Freelancer accepted and contract sent
 */
router.post('/accept-freelancer', employeeControler.acceptFreelancer);

/**
 * @swagger
 * /api/employer/receive-updates:
 *   post:
 *     summary: Receive updates from freelancer.
 *     tags: [Employer]
 *     requestBody:
 *       description: Update details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contract_id:
 *                 type: number
 *               update_message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Update received from freelancer. Returns a message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Update received
 */
router.post('/receive-updates', employeeControler.receiveUpdates);

/**
 * @swagger
 * /api/employer/message-freelancer:
 *   post:
 *     summary: Message the freelancer.
 *     tags: [Employer]
 *     requestBody:
 *       description: Message details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               freelancer_id:
 *                 type: number
 *               message_text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message sent to freelancer. Returns a message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Message sent to freelancer
 */
router.post('/message-freelancer', employeeControler.messageFreelancer);

module.exports = router;

