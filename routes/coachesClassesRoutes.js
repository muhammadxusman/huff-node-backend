const express = require('express');
const router = express.Router();
const coachesClassesController = require('../controllers/coachesClassesController');

// POST: Assign trainer to trainee
router.post('/coachesClasses', coachesClassesController.assignTrainerToTrainee);

module.exports = router;
