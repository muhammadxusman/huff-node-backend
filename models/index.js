// models/index.js

const User = require('./User');
const CoachesClasses = require('./coachesClasses');
const Workout = require('./workout');

// Call associate method to set relationships
User.associate({ CoachesClasses });

module.exports = {
  User,
  CoachesClasses,
  Workout,
};
