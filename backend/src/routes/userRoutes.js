const express = require('express');
const { auth, authorizeRoles } = require('../middlewares/auth');
const { getProfile, updateProfile, getAllUsers } = require('../controllers/userController');

const router = express.Router();

router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.get('/all', auth, authorizeRoles('admin'), getAllUsers);

module.exports = router;