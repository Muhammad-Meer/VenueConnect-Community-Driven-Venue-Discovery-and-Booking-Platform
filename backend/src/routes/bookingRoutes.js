const express = require('express');
const { auth, authorizeRoles } = require('../middlewares/auth');
const { createBooking, getMyBookings, getOwnerBookings } = require('../controllers/bookingController');

const router = express.Router();

router.post('/', auth, createBooking);
router.get('/my', auth, getMyBookings);
router.get('/owner', auth, authorizeRoles('venue_owner'), getOwnerBookings);

module.exports = router;