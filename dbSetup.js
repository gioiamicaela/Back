require('dotenv').config();
const mongoose = require('mongoose');

module.exports = {
  connect: async () => {
    mongoose.connect(process.env.MONGODB_CONNECTION_URL);
    console.log('[Database] ¡Las tablas fueron creadas!');
  },
  handleSeeder: async (req, res) => {
    await require('./seeders/userSeeder')();
    console.log('ok');
  },
};
