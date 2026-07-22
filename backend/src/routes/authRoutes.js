const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
    createVenue,
    getVenues,
    getVenue,
    updateVenue,
    updateVenueStatus
} = require('../controllers/venueController');

router.get('/', getVenues);
router.get('/:id', getVenue);

router.post('/', protect, authorize('owner'), createVenue);
router.put('/:id', protect, authorize('owner'), updateVenue);

// Admin routes
router.put('/:id/status', protect, authorize('admin'), updateVenueStatus);

module.exports = router;