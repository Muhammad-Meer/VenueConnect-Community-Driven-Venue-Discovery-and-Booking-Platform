const express = require('express');
const { auth, authorizeRoles } = require('../middlewares/auth');
const { createVenue, getVenues, getVenueById, updateVenue } = require('../controllers/venueController');

const router = express.Router();

router.get('/', getVenues);
router.get('/:id', getVenueById);
router.post('/', auth, authorizeRoles('venue_owner'), createVenue);
router.put('/:id', auth, authorizeRoles('venue_owner'), updateVenue);

module.exports = router;