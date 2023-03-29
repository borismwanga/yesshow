const { Review } = require('../models');

exports.createReview = async (req, res) => {
  const { userId, restaurantId, score, text } = req.body;

  try {
    const review = new Review({ userId, restaurantId, score, text });
    await review.save();

    res.status(201).send(review);
  } catch (err) {
    res.status(500).send(err);
  }
};
