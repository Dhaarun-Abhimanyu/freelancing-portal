const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Employer = require('./Employer');

const Proposal = sequelize.define('Proposal', {
  proposal_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  employer_id: { type: DataTypes.INTEGER, references: { model: Employer, key: 'employer_id' }, allowNull: false },
  cover_letter: { type: DataTypes.TEXT },
  status: { type: DataTypes.STRING(50), defaultValue: 'pending' },
  applied_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Proposal;

