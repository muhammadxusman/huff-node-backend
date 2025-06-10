const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/authController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

// POST /api/login
router.post('/login', loginUser);

module.exports = router;
