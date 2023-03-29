const Restaurant = require('../models/restaurant');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Add environment variable for JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

exports.registerOwner = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    phoneNumber,
    role: 'restaurant_owner',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  newUser.save((err, user) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(201).json(user);
  });
};

exports.loginOwner = async (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email, role: 'restaurant_owner' }, async (err, user) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  });
};

exports.createRestaurant = async (req, res) => {
  const { name, address, city, postalCode, phoneNumber, owner } = req.body;

  const newRestaurant = new Restaurant({
    name,
    address,
    city,
    postalCode,
    phoneNumber,
    owner,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  newRestaurant.save((err, restaurant) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(201).json(restaurant);
  });
};

exports.getRestaurant = async (req, res) => {
  const restaurantId = req.params.id;

  Restaurant.findById(restaurantId, (err, restaurant) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.status(200).json(restaurant);
  });
};

exports.updateRestaurant = async (req, res) => {
  const restaurantId = req.params.id;

  Restaurant.findByIdAndUpdate(
    restaurantId,
    { ...req.body, updatedAt: new Date() },
    { new: true },
    (err, restaurant) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
      res.status(200).json(restaurant);
    }
  );
};

exports.deleteRestaurant = async (req, res) => {
    const restaurantId = req.params.id;
  
    Restaurant.findByIdAndDelete(restaurantId, (err, restaurant) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
      res.status(200).json({ message: 'Restaurant deleted successfully' });
    });
  };
  