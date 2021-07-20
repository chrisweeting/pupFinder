const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  description: {
    type: Schema.Types.ObjectId,
    ref: 'pups'
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  pups: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('users', UserSchema);

module.exports = User;