const Booking = require('../models/booking');
const User = require('../models/user');
const Restaurant = require('../models/restaurant');

exports.createBooking = async (req, res) => {
  try {
    const { name, email, phone, date, restaurantId, numberOfGuests, specialRequests } = req.body;
    console.log('createBooking request:', { name, email, phone, date, restaurantId });

    if (!email || email.trim() === '') {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    const user = await User.findOneAndUpdate({ email }, { email, name, phone }, { upsert: true, new: true });
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ error: `Restaurant not found, ${restaurant}, ${restaurantId}` });
    }

    const booking = new Booking({
      date,
      numberOfGuests,
      specialRequests,
      restaurant: restaurant._id,
      user: user._id,
    });

    const result = await booking.save();

    // if (restaurant) {
    //   restaurant.bookings.push(result._id);
    //   await restaurant.save();
    // } else {
    //   // Handle the case where restaurant is undefined
    //   console.log(restaurant)
    // }

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ restaurant: req.user.restaurant }).populate('user');

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { confirmed: true }, { new: true });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
