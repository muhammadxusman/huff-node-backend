const { Workout } = require('../models');

exports.createWorkout = async (req, res) => {
  try {
    const {
      category,
      name,
      short_description,
      duration,
      rest_time,
      number_of_exercises,
      overview,
      how_to_perform,
      sets_reps
    } = req.body;

    const thumbnailPath = req.files?.thumbnail_img?.[0]?.path || '';
    const galleryPaths = req.files?.gallery_images?.map((file) => file.path) || [];

    const newWorkout = await Workout.create({
      category,
      name,
      short_description,
      duration,
      rest_time,
      number_of_exercises,
      overview,
      how_to_perform: JSON.parse(how_to_perform),
      sets_reps: JSON.parse(sets_reps),
      thumbnail_img: thumbnailPath,
      gallery_images: galleryPaths
    });

    res.status(201).json({ message: 'Workout created successfully', data: newWorkout });
  } catch (error) {
    console.error('Error creating workout:', error);
    res.status(500).json({ error: 'Failed to create workout' });
  }
};
