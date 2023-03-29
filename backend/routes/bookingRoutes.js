const express = require('express');
const router = express.Router();
const { createBooking, getBookings, confirmBooking } = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('user'), createBooking);

router.get('/', protect, authorize('restaurantOwner'), getBookings);

router.put('/:id', protect, authorize('restaurantOwner'), confirmBooking);

module.exports = router;
