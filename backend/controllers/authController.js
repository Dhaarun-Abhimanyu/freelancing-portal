const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User, UserSecurity, Freelancer, Employer } = require('../models'); // Sequelize models
const { sendSecurityCodeEmail } = require('../utils/sendMail');
const bcrypt = require('bcryptjs');
const {
  generateAccessToken,
  generateRefreshToken,
  generateSecurityCode
} = require('../utils/authUtils');

const ONE_HOUR = 60 * 60 * 1000;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const checkStatus = async (req, res) => {
  return res.status(200).json({
    message: "The token is still valid"
  });
}

const registerController = async (req, res) => {
  const user = req.body;
  try {
    if (!user.email || !user.username || !user.password || !user.role) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }
    if (user.role !== 'freelancer' && user.role !== 'employer') {
      return res.status(400).json({
        message: 'Invalid role'
      });
    }
    const existingUser = await User.findOne({ where: { email: user.email.toLowerCase() } });
    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await User.create({
      email: user.email.toLowerCase(),
      username: user.username,
      password: hashedPassword,
      role: user.role,
      isVerified: false
    });
    const code = generateSecurityCode();
    await UserSecurity.create({
      user_id: newUser.id,
      code: code,
      updatedAt: new Date()
    });
    sendSecurityCodeEmail(user.email.toLowerCase(), code);

    return res.status(201).json({
      message: 'Verification code sent to your email. Please verify to complete sign up',
      user: newUser
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
}

const loginController = async (req, res) => {
  const user = req.body;
  try {
    const checkUser = await User.findOne({ where: { email: user.email.toLowerCase() } });
    if (!checkUser) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    const isPasswordValid = await bcrypt.compare(user.password, checkUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid password'
      });
    }

    const isVerified = checkUser.isVerified;
    if (!isVerified) {
      return res.status(401).json({
        message: 'User not verified'
      });
    }

    const accesstoken = generateAccessToken(checkUser.id);
    const refreshtoken = generateRefreshToken(checkUser.id);

    res.cookie('accesstoken', accesstoken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });
    res.cookie('refreshtoken', refreshtoken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });

    return res.status(201).json({
      message: 'User logged in successfully',
      user: checkUser
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Failed login'
    });
  }
}

const logoutController = async (req, res) => {
  try {
    res.clearCookie('accesstoken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });
    res.clearCookie('refreshtoken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });
    return res.status(201).json({
      message: 'User logged out successfully'
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to logout'
    });
  }
}

const generateSecurityCodeController = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    const user_id = user.id;
    const code = generateSecurityCode();

    const userSecurityRecord = await UserSecurity.findOne({ where: { user_id } });
    if (!userSecurityRecord) {
      await UserSecurity.create({
        user_id: user_id,
        code: code
      });
    } else {
      userSecurityRecord.code = code;
      userSecurityRecord.updatedAt = new Date();
      await userSecurityRecord.save();
    }

    sendSecurityCodeEmail(email, code);
    return res.status(200).json({
      message: 'Security code created and mailed successfully'
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to generate security code'
    });
  }
}

const verifySecurityCodeController = async (req, res) => {
  const { email, code } = req.body;
  try {
    const userRecord = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!userRecord) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    const user_id = userRecord.id;
    const securityRecord = await UserSecurity.findOne({ where: { user_id: String(user_id) } });
    if (!securityRecord) {
      return res.status(404).json({
        message: 'Security code not found'
      });
    }

    const NOW = Date.now();
    const THEN = securityRecord.updatedAt.getTime();
    if (NOW - THEN > ONE_HOUR) {
      return res.status(400).json({
        message: 'Security code expired'
      });
    }

    const security_code = securityRecord.code;
    if (security_code === code) {
      // Mark the user as verified
      userRecord.isVerified = true;
      await userRecord.save();

      // Create freelancer or employer record based on user role
      if (userRecord.role === 'freelancer') {
        await Freelancer.create({ user_id: userRecord.id });
      } else if (userRecord.role === 'employer') {
        await Employer.create({ user_id: userRecord.id });
      }

      return res.status(200).json({
        message: 'Security code verified and user verified successfully'
      });
    } else {
      return res.status(400).json({
        message: 'Invalid security code'
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Failed to verify security code'
    });
  }
}
const resetPasswordController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!userRecord) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    userRecord.password = hashedPassword;
    await userRecord.save();

    return res.status(200).json({
      message: 'Password reset successfully'
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to reset password'
    });
  }
}

const getNewAccessTokenController = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshtoken;
    if (!refreshToken) {
      return res.status(401).json({
        message: 'No refresh token provided'
      });
    }

    const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const user_id = typeof payload === 'object' && 'id' in payload ? payload.id : null;
    if (!user_id) {
      return res.status(400).json({
        message: 'Invalid token payload'
      });
    }

    const accesstoken = generateAccessToken(user_id);
    const refreshtoken = generateRefreshToken(user_id);

    res.cookie('accesstoken', accesstoken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });
    res.cookie('refreshtoken', refreshtoken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });

    return res.status(201).json({
      message: 'Access token refreshed successfully'
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to get new access token'
    });
  }
}

const verifyRegisterSecurityCodeController = async (req, res) => {
  const { email, code } = req.body;
  try {
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "User already verified"
      });
    }

    const user_id = user.id;
    const securityRecord = await UserSecurity.findOne({ where: { user_id } });
    if (!securityRecord) {
      return res.status(404).json({
        message: "Security code not found"
      });
    }

    if (securityRecord.code !== code) {
      return res.status(400).json({
        message: "Invalid security code"
      });
    }

    user.isVerified = true;
    await user.save();

    const accesstoken = generateAccessToken(user.id);
    const refreshtoken = generateRefreshToken(user.id);

    res.cookie('accesstoken', accesstoken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });
    res.cookie('refreshtoken', refreshtoken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });

    return res.status(200).json({
      message: 'User verified and signed in successfully'
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to verify security code for sign up'
    });
  }
}

module.exports = {
  checkStatus,
  registerController,
  loginController,
  logoutController,
  generateSecurityCodeController,
  verifySecurityCodeController,
  resetPasswordController,
  getNewAccessTokenController,
  verifyRegisterSecurityCodeController
};

