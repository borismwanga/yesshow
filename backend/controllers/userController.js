const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
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

exports.getUser = async (req, res) => {
  const userId = req.params.id;

  User.findById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  });
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;

  User.findByIdAndUpdate(
    userId,
    { ...req.body, updatedAt: new Date() },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    }
  );
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  User.findByIdAndDelete(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  });
};
