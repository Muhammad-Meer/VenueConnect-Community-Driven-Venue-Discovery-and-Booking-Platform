const express = require('express');
const { auth } = require('../middlewares/auth');
const { createReview } = require('../controllers/reviewController');

const router = express.Router();

router.post('/', auth, createReview);

module.exports = router;