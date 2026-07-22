const express = require('express');
const { auth } = require('../middlewares/auth');
const { createPayment } = require('../controllers/paymentController');

const router = express.Router();

router.post('/', auth, createPayment);

module.exports = router;