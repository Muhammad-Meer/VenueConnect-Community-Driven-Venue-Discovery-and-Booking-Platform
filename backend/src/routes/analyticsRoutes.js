const express = require('express');
const { auth, authorizeRoles } = require('../middlewares/auth');
const { getOwnerAnalytics, getAdminAnalytics } = require('../controllers/analyticsController');

const router = express.Router();

router.get('/owner', auth, authorizeRoles('venue_owner'), getOwnerAnalytics);
router.get('/admin', auth, authorizeRoles('admin'), getAdminAnalytics);

module.exports = router;