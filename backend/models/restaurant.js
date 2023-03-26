const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  address: String,
  city: String,
  postalCode: String,
  phoneNumber: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: Date,
  updatedAt: Date,
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
