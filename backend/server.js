const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');



const dns = require("dns"); console.log("Before:", dns.getServers()); dns.setServers(["8.8.8.8", "1.1.1.1"]); console.log("After:", dns.getServers()); dns.resolve4("google.com", (err, addresses) => { console.log(err, addresses); });
dotenv.config();
connectDB();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use('/api/venues', require('./routes/venueRoutes'));


// Routes
app.use('/api/users', require('./src/routes/authRoutes'));

// Test route
app.get('/', (req, res) => {
  res.send('✅ Venue Booking API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});