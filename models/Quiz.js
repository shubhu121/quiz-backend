const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    questions: [{
        questionText: String,
        options: [String], // Array of 4 options
        correctAnswer: Number // Index of the correct option (0-3)
    }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Quiz', QuizSchema);
