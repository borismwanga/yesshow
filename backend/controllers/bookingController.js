const { Booking } = require('../models');

exports.createBooking = async (req, res) => {
  const { name, email, phoneNumber, restaurantId } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // If the user does not exist, create a new user
      user = new User({ name, email, phoneNumber });
      await user.save();
    }

    // Create a new booking
    const booking = new Booking({ userId: user._id, restaurantId });
    await booking.save();

    res.status(201).send(booking);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getBookingsForRestaurant = async (req, res) => {
  const { id } = req.params;

  try {
    const bookings = await Booking.find({ restaurantId: id });

    res.send(bookings);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateBookingStatus = async (req, res) => {
  const { id, status } = req.params;

  try {
    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });

    res.send(booking);
  } catch (err) {
    res.status(500).send(err);
  }
};
