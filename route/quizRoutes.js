const express = require('express');
const { createQuiz, getAllQuizzes, getQuizDetails, takeQuiz } = require('../controllers/quizController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createQuiz);
router.get('/', getAllQuizzes);
router.get('/:id', getQuizDetails);
router.post('/:id/attempt', authMiddleware, takeQuiz);

module.exports = router;
