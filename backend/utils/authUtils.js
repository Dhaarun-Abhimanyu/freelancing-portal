const jwt = require('jsonwebtoken');
require('dotenv').config();


const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_ACCESS_EXPIRATION = process.env.JWT_ACCESS_EXPIRATION;
const JWT_REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION;


const generateAccessToken = (id) => {
  const token = jwt.sign(
    { id: id.toString() },
    JWT_ACCESS_SECRET,
    { expiresIn: 60 * parseInt(JWT_ACCESS_EXPIRATION) }
  );
  return token;
}

const generateRefreshToken = (id) => {
  const token = jwt.sign(
    { id: id.toString() },
    JWT_REFRESH_SECRET,
    { expiresIn: 60 * parseInt(JWT_REFRESH_EXPIRATION) }
  );
  return token;
}

const generateSecurityCode = () => {
  const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const length = 3;
  let code = '';
  for (let i = 0; i < length; i++) {
    code += alphabets[Math.floor(Math.random() * alphabets.length)] + numbers[Math.floor(Math.random() * numbers.length)]
  }
  return code;
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateSecurityCode
}

