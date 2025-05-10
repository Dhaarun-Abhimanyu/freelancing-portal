const express = require('express');
const router = express.Router();
const freelancerController = require('../controllers/freelancerController');

/**
 * @swagger
 * tags:
 *   name: Freelancer
 *   description: Freelancer related endpoints
 */

/**
 * @swagger
 * /api/freelancer/apply-proposal:
 *   post:
 *     summary: Apply for a proposal.
 *     tags: [Freelancer]
 *     requestBody:
 *       description: Proposal application details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employer_id:
 *                 type: integer
 *               freelancer_id:
 *                 type: integer
 *               cover_letter:
 *                 type: string
 *     responses:
 *       201:
 *         description: Proposal applied successfully. Returns a message with proposal details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Proposal applied successfully
 *                 proposal:
 *                   type: object
 */
router.post('/apply-proposal', freelancerController.applyProposal);

/**
 * @swagger
 * /api/freelancer/accept-contract:
 *   post:
 *     summary: Accept a contract.
 *     tags: [Freelancer]
 *     requestBody:
 *       description: Contract acceptance details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contract_id:
 *                 type: integer
 *               freelancer_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Contract accepted. Returns a message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Contract accepted
 */
router.post('/accept-contract', freelancerController.acceptContract);

/**
 * @swagger
 * /api/freelancer/send-updates:
 *   post:
 *     summary: Send project updates.
 *     tags: [Freelancer]
 *     requestBody:
 *       description: Update details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contract_id:
 *                 type: integer
 *               update_message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Update sent successfully. Returns a message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Update sent
 */
router.post('/send-updates', freelancerController.sendUpdates);

/**
 * @swagger
 * /api/freelancer/message-employer:
 *   post:
 *     summary: Message the employer.
 *     tags: [Freelancer]
 *     requestBody:
 *       description: Message details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employer_id:
 *                 type: integer
 *               message_text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message sent to employer. Returns a message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Message sent to employer
 */
router.post('/message-employer', freelancerController.messageEmployer);

module.exports = router;