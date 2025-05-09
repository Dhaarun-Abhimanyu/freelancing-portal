const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Freelancer = sequelize.define('Freelancer', {
  freelancer_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  bio: { type: DataTypes.TEXT },
  wallet_balance: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00 },
  rating: { type: DataTypes.FLOAT, defaultValue: 0.0 }
});

module.exports = Freelancer;
