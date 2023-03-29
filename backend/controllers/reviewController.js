const Booking = require('../models/booking');
const Review = require('../models/review');
const Restaurant = require('../models/restaurant');

exports.createReview = async (req, res) => {
  try {
    const { bookingId, score, comment } = req.body;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (!booking.confirmed) {
      return res.status(400).json({ error: 'Booking not confirmed' });
    }

    const review = new Review({
      booking: booking._id,
      restaurant: booking.restaurant,
      user: booking.user,
      score,
      comment,
    });

    const result = await review.save();

    const restaurant = await Restaurant.findById(booking.restaurant);

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    restaurant.reviews.push(result._id);
    await restaurant.save();

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ restaurant: req.user.restaurant }).populate('user');

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
