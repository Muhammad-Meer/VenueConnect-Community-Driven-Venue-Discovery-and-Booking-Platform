const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: String,
  address: { type: String, required: true },
  city: { type: String, required: true },
  capacity: { type: Number, required: true },
  pricePerHour: { type: Number, required: true },
  amenities: [String],
  images: [String],
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number] // [longitude, latitude]
  },
  availability: [{ date: Date, slots: [String] }],
  isApproved: { type: Boolean, default: false },
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 }
}, { timestamps: true });

venueSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Venue', venueSchema);