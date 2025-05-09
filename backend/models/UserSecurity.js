const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Adjust the path if necessary

const UserSecurity = sequelize.define('UserSecurity', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: true
  },
  otpExpiry: {
    type: DataTypes.DATE,
    allowNull: true
  },
  loginAttempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'user_security',
  timestamps: true
});

UserSecurity.associate = (models) => {
  UserSecurity.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
};

module.exports = UserSecurity;

