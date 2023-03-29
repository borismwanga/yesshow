const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Restaurant = require('../models/restaurant');

exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Not authorized to access this resource' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      const restaurant = await Restaurant.findById(decoded.id);

      if (!restaurant) {
        return res.status(404).json({ error: 'User not found' });
      }

      req.user = { id: restaurant._id, role: 'restaurantOwner' };
      return next();
    }

    req.user = { id: user._id, role: user.role };
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Not authorized to access this resource' });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Not authorized to access this resource' });
    }

    next();
  };
};
