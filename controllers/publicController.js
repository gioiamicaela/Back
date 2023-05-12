const { User } = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dbSetup = require('../dbSetup');
const mongoose = require('mongoose');

module.exports = {
  getToken: async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    const password = req.body.password;
    if (!user) {
      return res.status(403).send('Incorrect credentials.');
    }
    const compare = await bcrypt.compare(password, user.password);
    if (compare) {
      const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET);
      res.json({ token, userId: user.id });
    } else {
      return res.status(403).send('Incorrect credentials.');
    }
  },

  handleRegister: async (req, res) => {
    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send('That user already exists!');
    } else {
      // Insert the new user if they do not exist yet
      const newUser = new User({
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      });
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(newUser.password, salt);
      await newUser.save();
      res.send(newUser);
    }
  },
};
