const Venue = require('../models/Venue');
const asyncHandler = require('../utils/asyncHandler');

// Create Venue (Owner only)
exports.createVenue = asyncHandler(async (req, res) => {
    req.body.owner = req.user.id;
    const venue = await Venue.create(req.body);
    res.status(201).json({ success: true, data: venue });
});

// Get all venues with filters
exports.getVenues = asyncHandler(async (req, res) => {
    const { city, minPrice, maxPrice, capacity, date } = req.query;
    
    let query = { status: 'approved' };

    if (city) query['location.city'] = city;
    if (minPrice) query.pricePerHour = { $gte: minPrice };
    if (maxPrice) query.pricePerHour = { ...query.pricePerHour, $lte: maxPrice };
    if (capacity) query.capacity = { $gte: capacity };

    const venues = await Venue.find(query).populate('owner', 'name email');
    res.json({ success: true, count: venues.length, data: venues });
});

// Get single venue
exports.getVenue = asyncHandler(async (req, res) => {
    const venue = await Venue.findById(req.params.id).populate('owner');
    if (!venue) return res.status(404).json({ success: false, message: 'Venue not found' });
    
    res.json({ success: true, data: venue });
});

// Update Venue (Owner only)
exports.updateVenue = asyncHandler(async (req, res) => {
    let venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });

    if (venue.owner.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized' });
    }

    venue = await Venue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: venue });
});

// Admin - Approve/Reject Venue
exports.updateVenueStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const venue = await Venue.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json({ success: true, data: venue });
});