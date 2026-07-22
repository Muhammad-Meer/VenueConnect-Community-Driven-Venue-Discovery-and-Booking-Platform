const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  paymentMethod: { type: String, enum: ['stripe', 'easypaisa', 'jazzcash', 'cod'] },
  transactionId: String,
  status: { type: String, enum: ['success', 'failed', 'pending'] },
  receiptUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);