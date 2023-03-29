const { User } = require('../models/user');

exports.getUser = async (req, res) => {
  const { sub } = req.oidc.user;

  try {
    const user = await User.findOne({ auth0Id: sub });

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};
const User = require('../models/user');

exports.createUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const user = new User({ name, email, phone });
    const result = await user.save();

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
