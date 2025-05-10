const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Freelancer = sequelize.define('Freelancer', {
  freelancer_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING(255), allowNull: false },
  email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(255), allowNull: false },
  bio: { type: DataTypes.TEXT },
  wallet_balance: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00 },
  rating: { type: DataTypes.FLOAT, defaultValue: 0.0 },
  isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = Freelancer;
