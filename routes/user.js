const express = require('express');
const router = express.Router();
const { createUser, getAllUsers } = require('../controllers/userController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');


router.post('/users',authenticate, authorizeRoles('admin', 'trainer'), createUser);
router.get('/users', getAllUsers);

module.exports = router;
