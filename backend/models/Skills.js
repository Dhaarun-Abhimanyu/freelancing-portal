const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Freelancer = require('./Freelancer');

const Skills = sequelize.define('Skills', {
  skill_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  freelancer_id: { type: DataTypes.INTEGER, references: { model: Freelancer, key: 'freelancer_id' }, allowNull: false },
  skill_name: { type: DataTypes.STRING(255), allowNull: false }
});

module.exports = Skills;

