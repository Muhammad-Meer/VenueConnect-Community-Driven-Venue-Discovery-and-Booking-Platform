const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, required: true },
  startTime: String,
  endTime: String,
  totalHours: Number,
  totalAmount: Number,
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled', 'completed'], 
    default: 'pending' 
  },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'paid', 'refunded'], 
    default: 'pending' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);