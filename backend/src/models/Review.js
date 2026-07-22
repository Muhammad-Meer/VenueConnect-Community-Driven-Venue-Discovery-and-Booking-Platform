const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue' },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);