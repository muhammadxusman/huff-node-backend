const express = require('express');
const router = express.Router();
const { createUser, getAllUsers , updateUser } = require('../controllers/userController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');


router.post('/users',authenticate, authorizeRoles('admin', 'trainer'), createUser);
router.get('/users', getAllUsers);
// Update user (using body only)
router.put('/update-users',authenticate, authorizeRoles('admin'), updateUser);

module.exports = router;
