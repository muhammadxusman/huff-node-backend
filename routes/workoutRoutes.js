const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const workoutController = require('../controllers/workoutController');

router.post(
  '/workouts',
  upload.fields([
    { name: 'thumbnail_img', maxCount: 1 },
    { name: 'gallery_images', maxCount: 10 }
  ]),
  workoutController.createWorkout
);


module.exports = router;
