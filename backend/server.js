require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./src/config/db');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/venues', require('./src/routes/venueRoutes'));
app.use('/api/bookings', require('./src/routes/bookingRoutes'));
app.use('/api/payments', require('./src/routes/paymentRoutes'));
app.use('/api/reviews', require('./src/routes/reviewRoutes'));
app.use('/api/notifications', require('./src/routes/notificationRoutes'));
const errorHandler = require('./src/middlewares/errorHandler');

// ... all routes ke baad
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});