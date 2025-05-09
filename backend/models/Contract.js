const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Freelancer = require('./Freelancer');

const Contract = sequelize.define('Contract', {
  contract_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  freelancer_id: { type: DataTypes.INTEGER, references: { model: Freelancer, key: 'freelancer_id' }, allowNull: false },
  payment_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  contract_status: { type: DataTypes.STRING(50), defaultValue: 'active' },
  start_date: { type: DataTypes.DATE, allowNull: false },
  end_date: { type: DataTypes.DATE }
});

module.exports = Contract;

