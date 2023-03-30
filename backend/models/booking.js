const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  numberOfGuests: {
    type: Number,
    required: true,
  },
  additionalRequests: {
    type: String,
    trim: true,
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
