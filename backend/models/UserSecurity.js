const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');  // Adjust the path as needed

const UserSecurity = sequelize.define('UserSecurity', {
  user_id: {
    type: DataTypes.STRING,  // Assuming the user_id is stored as a string (e.g., MongoDB ObjectId in the User collection)
    allowNull: false,
    unique: true
  },
  code: {
    type: DataTypes.STRING,  // This will store the OTP code
    allowNull: true
  },
  updatedAt: {
    type: DataTypes.DATE,  // Sequelize will automatically handle the timestamp for this
    defaultValue: Sequelize.NOW
  }
}, {
  tableName: 'user_security',
  timestamps: true  // Will automatically handle createdAt and updatedAt fields
});

// Association with User model
UserSecurity.associate = (models) => {
  UserSecurity.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
};

module.exports = UserSecurity;
