const jwt = require('jsonwebtoken');
require('dotenv').config();
const { 
    Freelancer, 
    Employer, 
    UserSecurity 
} = require('../models'); 
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
  const { email, username, password, role } = req.body;
  const lowerEmail = email.toLowerCase();
  try {
    if (!email || !username || !password || !role) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }
    if (role !== 'freelancer' && role !== 'employer') {
      return res.status(400).json({
        message: 'Invalid role'
      });
    }
    let existingRecord;
    if (role === 'freelancer') {
      existingRecord = await Freelancer.findOne({ where: { email: lowerEmail } });
    } else {
      existingRecord = await Employer.findOne({ where: { email: lowerEmail } });
    }
    if (existingRecord) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let newRecord;
    if (role === 'freelancer') {
      newRecord = await Freelancer.create({
        email: lowerEmail,
        username,
        password: hashedPassword,
        isVerified: false,
      });
    } else {
      newRecord = await Employer.create({
        email: lowerEmail,
        username,
        password: hashedPassword,
        isVerified: false,
      });
    }

    const code = generateSecurityCode();
    await UserSecurity.create({
      user_id: newRecord.id,
      code: code,
      updatedAt: new Date()
    });
    sendSecurityCodeEmail(lowerEmail, code);

    return res.status(201).json({
      message: 'Verification code sent to your email. Please verify to complete sign up',
      user: newRecord
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
}

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const lowerEmail = email.toLowerCase();
  try {
    let record = await Freelancer.findOne({ where: { email: lowerEmail } });
    let role = 'freelancer';
    if (!record) {
      record = await Employer.findOne({ where: { email: lowerEmail } });
      role = 'employer';
    }
    if (!record) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, record.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid password'
      });
    }

    if (!record.isVerified) {
      return res.status(401).json({
        message: 'User not verified'
      });
    }

    const accesstoken = generateAccessToken(record.id);
    const refreshtoken = generateRefreshToken(record.id);

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
      user: record
    });
  } catch (err) {
    console.error(err);
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
    console.error(err);
    return res.status(500).json({
      message: 'Failed to logout'
    });
  }
}

const generateSecurityCodeController = async (req, res) => {
  const { email } = req.body;
  const lowerEmail = email.toLowerCase();
  try {
    let record = await Freelancer.findOne({ where: { email: lowerEmail } });
    if (!record) record = await Employer.findOne({ where: { email: lowerEmail } });
    if (!record) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    const code = generateSecurityCode();

    const userSecurityRecord = await UserSecurity.findOne({ where: { user_id: record.id } });
    if (!userSecurityRecord) {
      await UserSecurity.create({
        user_id: record.id,
        code: code
      });
    } else {
      userSecurityRecord.code = code;
      userSecurityRecord.updatedAt = new Date();
      await userSecurityRecord.save();
    }

    sendSecurityCodeEmail(lowerEmail, code);
    return res.status(200).json({
      message: 'Security code created and mailed successfully'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Failed to generate security code'
    });
  }
}

const verifyRegisterSecurityCodeController = async (req, res) => {
  const { email, code } = req.body;
  const lowerEmail = email.toLowerCase();
  try {
    let record = await Freelancer.findOne({ where: { email: lowerEmail } });
    if (!record) record = await Employer.findOne({ where: { email: lowerEmail } });
    if (!record) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const securityRecord = await UserSecurity.findOne({ where: { user_id: record.id } });
    if (!securityRecord) {
      return res.status(404).json({
        message: "Security code not found"
      });
    }

    const NOW = Date.now();
    const THEN = securityRecord.updatedAt.getTime();
    if (NOW - THEN > ONE_HOUR) {
      return res.status(400).json({
        message: 'Security code expired'
      });
    }

    if (securityRecord.code !== code) {
      return res.status(400).json({
        message: "Invalid security code"
      });
    }


    record.isVerified = true;
    await record.save();

    const accesstoken = generateAccessToken(record.id);
    const refreshtoken = generateRefreshToken(record.id);

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
    console.error(err);
    return res.status(500).json({
      message: 'Failed to verify security code for sign up'
    });
  }
}

const resetPasswordController = async (req, res) => {
  const { email, password } = req.body;
  const lowerEmail = email.toLowerCase();
  try {
    let record = await Freelancer.findOne({ where: { email: lowerEmail } });
    if (!record) record = await Employer.findOne({ where: { email: lowerEmail } });
    if (!record) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    record.password = hashedPassword;
    await record.save();

    return res.status(200).json({
      message: 'Password reset successfully'
    });
  } catch (err) {
    console.error(err);
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
    console.error(err);
    return res.status(500).json({
      message: 'Failed to get new access token'
    });
  }
}

module.exports = {
  checkStatus,
  registerController,
  loginController,
  logoutController,
  generateSecurityCodeController,
  verifyRegisterSecurityCodeController,
  resetPasswordController,
  getNewAccessTokenController
};

