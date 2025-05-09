const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Employer = sequelize.define('Employer', {
  employer_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  company_name: { type: DataTypes.STRING(255), allowNull: false },
  industry: { type: DataTypes.STRING(255) }
});

module.exports = Employer;

