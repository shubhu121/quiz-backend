const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    score: Number,
    total: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', ResultSchema);
