const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const User = require('./User');
const CoachesClasses = require('./coachesClasses');
const Workout = require('./workout');

// Associations
User.associate({ CoachesClasses });

module.exports = {
  sequelize, // ✅ Export sequelize here
  User,
  CoachesClasses,
  Workout,
};
