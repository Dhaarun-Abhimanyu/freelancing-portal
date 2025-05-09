const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Adjust the path if necessary

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('freelancer', 'employer'),
    allowNull: false
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'users',
  timestamps: true
});

User.associate = (models) => {
  User.hasOne(models.UserSecurity, { foreignKey: 'user_id', onDelete: 'CASCADE' });
  User.hasOne(models.Freelancer, { foreignKey: 'user_id' });
  User.hasOne(models.Employer, { foreignKey: 'user_id' });
};

module.exports = User;

