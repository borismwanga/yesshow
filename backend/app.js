const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userController = require('./controllers/userController');
const bookingController = require('./controllers/bookingController');
const restaurantController = require('./controllers/restaurantController');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/bookingApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.post('/register', userController.register);
app.get('/user/:id', userController.getUser);
app.put('/user/:id', userController.updateUser);
app.delete('/user/:id', userController.deleteUser);

app.post('/owner/register', restaurantController.registerOwner);
app.post('/owner/login', restaurantController.loginOwner);

app.post('/restaurant', restaurantController.createRestaurant);
app.get('/restaurant/:id', restaurantController.getRestaurant);
app.put('/restaurant/:id', restaurantController.updateRestaurant);
app.delete('/restaurant/:id', restaurantController.deleteRestaurant);

app.post('/booking', bookingController.createBooking);
app.get('/booking/:id', bookingController.getBooking);
app.put('/booking/:id', bookingController.updateBooking);
app.delete('/booking/:id', bookingController.deleteBooking);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
