const User = require('../models/user');
const Restaurant = require('../models/restaurant');
const Booking = require('../models/booking');

exports.createBooking = async (req, res) => {
  const {
    restaurantId,
    name,
    email,
    phoneNumber,
    dateTime,
    numberOfGuests,
    specialRequests,
  } = req.body;

  // Find or create user
  let user = await User.findOne({ phoneNumber });

  if (!user || user.name !== name) {
    user = new User({
      firstName: name,
      lastName: '', // Update this if you want to store the last name as well
      email,
      phoneNumber,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await user.save();
  }

  const newBooking = new Booking({
    user: user._id,
    restaurant: restaurantId,
    name,
    email,
    phoneNumber,
    dateTime,
    numberOfGuests,
    specialRequests,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  newBooking.save((err, booking) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(201).json(booking);
  });
};
