const Venue = require('../models/Venue');

const createVenue = async (req, res) => {
  try {
    const venue = await Venue.create({ ...req.body, owner: req.user.id });
    res.status(201).json({ success: true, venue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVenues = async (req, res) => {
  try {
    const { city, minPrice, maxPrice } = req.query;
    let query = { isApproved: true };

    if (city) query.city = city;
    if (minPrice || maxPrice) {
      query.pricePerHour = {};
      if (minPrice) query.pricePerHour.$gte = Number(minPrice);
      if (maxPrice) query.pricePerHour.$lte = Number(maxPrice);
    }

    const venues = await Venue.find(query).populate('owner', 'name');
    res.json({ success: true, venues });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVenueById = async (req, res) => {
  const venue = await Venue.findById(req.params.id).populate('owner');
  if (!venue) return res.status(404).json({ message: 'Venue not found' });
  res.json({ success: true, venue });
};

const updateVenue = async (req, res) => {
  const venue = await Venue.findOneAndUpdate(
    { _id: req.params.id, owner: req.user.id },
    req.body,
    { new: true }
  );
  res.json({ success: true, venue });
};

module.exports = { createVenue, getVenues, getVenueById, updateVenue };