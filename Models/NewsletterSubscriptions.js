const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const newsLetterSubscriptions = new Schema({
  uid: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('newsLetterSubscriptions', newsLetterSubscriptions);