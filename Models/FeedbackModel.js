const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const feedbacks = new Schema({
    uid: {
        type: String,
        required: true
    },
    featureSuggestions: {
        type: String,
    },
    feedbacks: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('feedbacks', feedbacks);