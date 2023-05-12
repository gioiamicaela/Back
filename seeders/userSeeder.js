const { User } = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = async () => {
  const usersCount = await User.countDocuments({}).exec();
  if (usersCount) await User.collection.drop();
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash('123', salt);
  await User.insertMany([
    new User({
      firstname: 'ejemplo',
      lastname: 'user',
      email: 'user@up.com',
      password: encryptedPassword,
    }),
  ]);
  console.log('[Database] User generated');
};
