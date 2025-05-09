const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Freelancer = require('./Freelancer');

const Review = sequelize.define('Review', {
  review_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  freelancer_id: { type: DataTypes.INTEGER, references: { model: Freelancer, key: 'freelancer_id' }, allowNull: false },
  rating: { type: DataTypes.FLOAT, allowNull: false },
  review_text: { type: DataTypes.TEXT }
});

module.exports = Review;

