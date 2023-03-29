const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  auth0Id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
