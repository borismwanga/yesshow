const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  numberOfGuests: {
    type: Number,
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
<<<<<<< HEAD
  numberOfGuests: {
    type: Number,
    required: true,
  },
  additionalRequests: {
    type: String,
    trim: true,
  }
=======
  specialRequests: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Denied'],
    default: 'Pending',
  },
}, {
  timestamps: true,
>>>>>>> a826db256533fcf13047c4b2a0b461908ee94fb1
});

module.exports = mongoose.model('Booking', bookingSchema);
