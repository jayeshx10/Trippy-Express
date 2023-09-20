const mongoose = require('mongoose');
const { trippyUser } = require('../models/trippyUser.model');

const destinationSchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
  rating: Number,
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'trippyUser'
    },
    reviewText: String,
  }]
});

const Destination = mongoose.model('Destination', destinationSchema);
module.exports = Destination;