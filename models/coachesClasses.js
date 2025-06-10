// models/coachesClasses.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const CoachesClasses = sequelize.define('CoachesClasses', {
  trainerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  traineeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
}, {
  timestamps: true,
  tableName: 'coachesClasses',
});

module.exports = CoachesClasses;
