const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    unique: 'Two emails cannot share the same email({VALUE})',
  },
  password: String,
});

userSchema.plugin(beautifyUnique);
const User = mongoose.model('User', userSchema);

module.exports = {
  userSchema,
  User,
};
