const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'trainee', 'trainer'),
    allowNull: false,
    defaultValue: 'trainee',
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    allowNull: false,
    defaultValue: 'active',
  },
}, {
  timestamps: true,
});

// Associations will be added in associate method
User.associate = (models) => {
  // A Trainer can have many Trainees
  User.belongsToMany(User, {
    as: 'Trainees',
    through: models.CoachesClasses,
    foreignKey: 'trainerId',
    otherKey: 'traineeId',
  });

  // A Trainee can have many Trainers
  User.belongsToMany(User, {
    as: 'Trainers',
    through: models.CoachesClasses,
    foreignKey: 'traineeId',
    otherKey: 'trainerId',
  });
};

module.exports = User;
