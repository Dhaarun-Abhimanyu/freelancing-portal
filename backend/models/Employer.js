const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Employer = sequelize.define('Employer', {
  employer_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(255), allowNull: false },
  email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(255), allowNull: false },
  company_name: { type: DataTypes.STRING(255), allowNull: false },
  industry: { type: DataTypes.STRING(255) }
});

module.exports = Employer;

