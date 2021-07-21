const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Float = require('mongoose-float').loadType(mongoose, 2);

const PupSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  breed: {
    type: String
  },
  age: {
    type: Number,
  },
  status: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  size: {
    type: String
  },
  color: {
    type: String
  },
  gender: {
    type: String
  },
  fee: {
    type: Float,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Pup = mongoose.model('pups', PupSchema);

module.exports = Pup;