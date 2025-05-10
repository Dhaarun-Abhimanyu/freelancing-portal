const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user.
 *     tags: [Auth]
 *     requestBody:
 *       description: User registration details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [freelancer, employer]
 *     responses:
 *       201:
 *         description: Registration successful. Returns a message along with user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Verification code sent to your email. Please verify to complete sign up
 *                 user:
 *                   type: object
 *       400:
 *         description: Bad request error - missing fields or user already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All fields are required / User already exists
 */
router.post('/register', authController.registerController);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login.
 *     tags: [Auth]
 *     requestBody:
 *       description: Login details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Login successful. Returns a message along with user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User logged in successfully
 *                 user:
 *                   type: object
 */
router.post('/login', authController.loginController);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: User logout.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful. Returns a logout message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User logged out successfully
 */
router.post('/logout', authController.logoutController);

/**
 * @swagger
 * /api/auth/generate-security-code:
 *   post:
 *     summary: Generate security code for password reset or registration verification.
 *     tags: [Auth]
 *     requestBody:
 *       description: Email address for sending the security code.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Security code sent. Returns a success message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Security code sent to your email
 *       400:
 *         description: Bad request error - missing email or user not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email is required / User not found
 */
router.post('/generate-security-code', authController.generateSecurityCodeController);

/**
 * @swagger
 * /api/auth/verify-security-code:
 *   post:
 *     summary: Verify the security code sent to the user.
 *     tags: [Auth]
 *     requestBody:
 *       description: Security code verification details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Security code verified. Returns a success message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Security code verified successfully
 *       400:
 *         description: Bad request error - invalid code or email not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid security code / Email not found
 */
router.post('/verify-security-code', authController.verifyRegisterSecurityCodeController);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset user password.
 *     tags: [Auth]
 *     requestBody:
 *       description: New password details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               newPassword:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful. Returns a success message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset successful
 *       400:
 *         description: Bad request error - missing fields or invalid code.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All fields are required / Invalid security code
 */
router.post('/reset-password', authController.resetPasswordController);

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Refresh access token using refresh token.
 *     tags: [Auth]
 *     requestBody:
 *       description: Refresh token details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token refreshed successfully. Returns new access token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 message:
 *                   type: string
 *                   example: Token refreshed successfully
 *       400:
 *         description: Bad request error - missing refresh token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Refresh token is required
 */
router.post('/refresh-token', authController.getNewAccessTokenController);

/**
 * @swagger
 * /api/auth/status:
 *   get:
 *     summary: Check token status.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The token is still valid. Returns a message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The token is still valid
 */
router.get('/status', authMiddleware, authController.checkStatus);

module.exports = router;

