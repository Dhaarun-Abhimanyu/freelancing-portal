const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Routes
router.post('/register', authController.registerController);
router.post('/login', authController.loginController);
router.post('/logout', authController.logoutController);
router.post('/generate-security-code', authController.generateSecurityCodeController);
router.post('/verify-security-code', authController.verifySecurityCodeController);
router.post('/reset-password', authController.resetPasswordController);
router.post('/refresh-token', authController.getNewAccessTokenController);
router.post('/verify-register-code', authController.verifyRegisterSecurityCodeController);

// Health check route
router.get('/status', authMiddleware, authController.checkStatus);

module.exports = router;

