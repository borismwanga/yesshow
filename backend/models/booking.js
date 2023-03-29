const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  name: String,
  email: String,
  phoneNumber: String,
  dateTime: Date,
  numberOfGuests: Number,
  specialRequests: String,
  createdAt: Date,
  updatedAt: Date,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
