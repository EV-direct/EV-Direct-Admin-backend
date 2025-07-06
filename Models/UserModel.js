const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  firebase_uid: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user'],
    default: 'user'
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'inactive', 'deleted'],
    default: 'active'
  }
},{
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);