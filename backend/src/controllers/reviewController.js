const Review = require('../models/Review');
const Venue = require('../models/Venue');

const createReview = async (req, res) => {
  try {
    const review = await Review.create({ ...req.body, customer: req.user.id });

    // Update venue rating
    const reviews = await Review.find({ venue: req.body.venue });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await Venue.findByIdAndUpdate(req.body.venue, {
      averageRating: avgRating.toFixed(1),
      totalReviews: reviews.length
    });

    res.status(201).json({ success: true, review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createReview };