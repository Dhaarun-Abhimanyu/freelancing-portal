const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Proposal = require('./Proposal');

const Message = sequelize.define('Message', {
  message_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  proposal_id: { type: DataTypes.INTEGER, references: { model: Proposal, key: 'proposal_id' }, allowNull: false },
  message_text: { type: DataTypes.TEXT },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  accepted: { type: DataTypes.BOOLEAN, defaultValue: false }
});

module.exports = Message;

