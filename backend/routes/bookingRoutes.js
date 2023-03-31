const express = require('express');
const router = express.Router();
// const { createBooking, getBookings, confirmBooking } = require('../controllers/bookingController');
const BookingController = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', BookingController.createBooking);

// router.get('/', protect, authorize('restaurantOwner'), BookingController.getBookings);

// router.put('/:id', protect, authorize('restaurantOwner'), BookingController.confirmBooking);

module.exports = router;
