const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { User } = require('../users/users.model');
const userModel = require('../users/users.model');

const login = async (req, res) => {
  const { email, password } = req.body;
  let query = { email: email, password: password };
  const user = await User.findOne(query);

  if (user) {
    const token = jwt.sign(
      { email: email, role: 'admin' },
      process.env.TOKEN_SECRET
    );
    res.json({
      token: token,
      user: user,
    });
  } else {
    res.status(401).send('Username or password incorrect');
  }
};

const login2 = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.login(email, password);
    console.log(user);
    if (user) {
      const token = jwt.sign(
        { email: email, role: 'admin' },
        process.env.TOKEN_SECRET
      );
      res.json({ token: token, user: user });
    }
  } catch (err) {
    res.status(401).send('Username or password incorrect');
  }
};

module.exports = {
  login,
  login2,
};
