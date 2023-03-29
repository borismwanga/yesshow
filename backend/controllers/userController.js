const { User } = require('../models');

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
