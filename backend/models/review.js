const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
  score: { type: Number, required: true },
  text: String,
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
