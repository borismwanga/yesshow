const mongoose = require('mongoose');

const { Schema } = mongoose;

const restaurantSchema = new Schema({
  name: String,
  address: String,
  phoneNumber: String,
  email: String,
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
