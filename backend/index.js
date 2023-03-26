const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { userController, restaurantController, bookingController } = require('./controllers');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/restaurant-booking', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// Middleware
app.use(bodyParser.json());

// User routes
app.post('/api/users', userController.createUser);
app.get('/api/users/:id', userController.getUser);
app.put('/api/users/:id', userController.updateUser);
app.delete('/api/users/:id', userController.deleteUser);

// Restaurant owner registration and login routes
app.post('/api/restaurant-owners/register', restaurantController.registerOwner);
app.post('/api/restaurant-owners/login', restaurantController.loginOwner);

// Restaurant routes
app.post('/api/restaurants', restaurantController.createRestaurant);
app.get('/api/restaurants/:id', restaurantController.getRestaurant);
app.put('/api/restaurants/:id', restaurantController.updateRestaurant);
app.delete('/api/restaurants/:id', restaurantController.deleteRestaurant);

// Booking routes
app.post('/api/bookings', bookingController.createBooking);
app.get('/api/bookings/:id', bookingController.getBooking);
app.put('/api/bookings/:id', bookingController.updateBooking);
app.delete('/api/bookings/:id', bookingController.deleteBooking);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
