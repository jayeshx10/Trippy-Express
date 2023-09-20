const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  userName: String,
  age: Number
})
const trippyUser = mongoose.model('trippyUser', userSchema);

module.exports = { trippyUser };