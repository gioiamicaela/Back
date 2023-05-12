const { User } = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dbSetup = require('../dbSetup');
const mongoose = require('mongoose');

module.exports = {
  handlePassword: async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(req.body.password, salt);
    const userUpdated = await User.findOneAndUpdate(
      { email: req.body.email },
      { password: newPassword }
    );
    return res.status(200).send('Password updated');
  },
};
