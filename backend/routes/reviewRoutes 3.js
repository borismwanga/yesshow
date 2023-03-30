const express = require('express');
const router = express.Router();
const { createReview, getReviews } = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('user'), createReview);

router.get('/', protect, authorize('restaurantOwner'), getReviews);

module.exports = router;
