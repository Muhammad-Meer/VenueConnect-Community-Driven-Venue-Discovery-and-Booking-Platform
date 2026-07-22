const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

const createPayment = async (req, res) => {
  try {
    const { bookingId, paymentMethod, transactionId } = req.body;
    
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const payment = await Payment.create({
      booking: bookingId,
      user: req.user.id,
      amount: booking.totalAmount,
      paymentMethod,
      transactionId,
      status: 'success'
    });

    await Booking.findByIdAndUpdate(bookingId, { 
      paymentStatus: 'paid',
      status: 'confirmed'
    });

    res.status(201).json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPayment };