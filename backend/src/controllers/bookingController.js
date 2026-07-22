const Booking = require('../models/Booking');
const Venue = require('../models/Venue');

const createBooking = async (req, res) => {
  try {
    const { venue, date, startTime, endTime } = req.body;
    
    const venueData = await Venue.findById(venue);
    if (!venueData) return res.status(404).json({ message: 'Venue not found' });

    const totalHours = 2; // calculate properly in real app
    const totalAmount = venueData.pricePerHour * totalHours;

    const booking = await Booking.create({
      customer: req.user.id,
      venue,
      owner: venueData.owner,
      date,
      startTime,
      endTime,
      totalHours,
      totalAmount
    });

    res.status(201).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ customer: req.user.id })
    .populate('venue', 'name address');
  res.json({ success: true, bookings });
};

const getOwnerBookings = async (req, res) => {
  const bookings = await Booking.find({ owner: req.user.id })
    .populate('customer', 'name email');
  res.json({ success: true, bookings });
};

module.exports = { createBooking, getMyBookings, getOwnerBookings };