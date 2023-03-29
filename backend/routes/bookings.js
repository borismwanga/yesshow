const express = require('express');
const { bookingController } = require('../controllers');

const router = express.Router();

router.post('/', bookingController.createBooking);
router.get('/restaurants/:id/bookings', bookingController.getBookingsForRestaurant);
router.put('/bookings/:id', bookingController.updateBookingStatus);

module.exports = router;
