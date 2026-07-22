const Booking = require('../models/Booking');
const Venue = require('../models/Venue');
const User = require('../models/User');
const Payment = require('../models/Payment');

// Owner Analytics
const getOwnerAnalytics = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const { startDate, endDate } = req.query;

    // Total Revenue
    const revenueStats = await Payment.aggregate([
      {
        $match: {
          status: 'success',
          createdAt: {
            $gte: new Date(startDate || '2025-01-01'),
            $lte: new Date(endDate || Date.now())
          }
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$amount' },
          totalBookings: { $sum: 1 }
        }
      }
    ]);

    // Monthly Revenue Trend
    const monthlyTrend = await Payment.aggregate([
      {
        $match: { status: 'success' }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          revenue: { $sum: '$amount' },
          bookings: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Top Venues
    const topVenues = await Booking.aggregate([
      { $match: { owner: ownerId } },
      {
        $group: {
          _id: '$venue',
          totalBookings: { $sum: 1 },
          totalRevenue: { $sum: '$totalAmount' }
        }
      },
      { $sort: { totalRevenue: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'venues',
          localField: '_id',
          foreignField: '_id',
          as: 'venueInfo'
        }
      }
    ]);

    // Occupancy Rate (Last 30 days)
    const occupancy = await Booking.aggregate([
      {
        $match: {
          owner: ownerId,
          status: { $in: ['confirmed', 'completed'] }
        }
      },
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        totalRevenue: revenueStats[0]?.totalRevenue || 0,
        totalBookings: revenueStats[0]?.totalBookings || 0,
        monthlyTrend,
        topVenues,
        occupancyRate: occupancy[0] ? Math.round(occupancy[0].totalBookings / 30) : 0
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin Analytics (Platform Wide)
const getAdminAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalVenues = await Venue.countDocuments({ isApproved: true });
    const totalBookings = await Booking.countDocuments();

    const totalRevenue = await Payment.aggregate([
      { $match: { status: 'success' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    // Revenue by Month (Last 6 months)
    const revenueByMonth = await Payment.aggregate([
      { $match: { status: 'success' } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          revenue: { $sum: '$amount' }
        }
      },
      { $sort: { _id: -1 } },
      { $limit: 6 }
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalVenues,
        totalBookings,
        totalRevenue: totalRevenue[0]?.total || 0,
        revenueByMonth
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getOwnerAnalytics, getAdminAnalytics };