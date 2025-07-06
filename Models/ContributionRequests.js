const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const contributionRequests = new Schema({
  uid: {
    type: String
  },
  skills: {
    type: String,
    required: true
  },
  availability: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('contributionRequests', contributionRequests);