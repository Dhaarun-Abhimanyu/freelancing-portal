const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Freelancer = require('./Freelancer');

const Payment = sequelize.define('Payment', {
  payment_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  freelancer_id: { type: DataTypes.INTEGER, references: { model: Freelancer, key: 'freelancer_id' }, allowNull: false },
  transaction_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  payment_status: { type: DataTypes.STRING(50), defaultValue: 'pending' }
});

module.exports = Payment;

