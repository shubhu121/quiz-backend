const Quiz = require('../models/Quiz');

exports.createQuiz = async (req, res) => {
    try {
        const { title, questions } = req.body;
        const newQuiz = new Quiz({ title, questions, createdBy: req.user.id });
        await newQuiz.save();
        res.status(201).json({ message: 'Quiz created successfully' });
    } 
    catch (error) {
        res.status(500).json({ message: 'Error creating quiz', error });
    }
};

exports.getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } 
    catch (error) {
        res.status(500).json({ message: 'Error fetching quizzes', error });
    }
};

exports.getQuizDetails = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.json(quiz);
    } 
    catch (error) {
        res.status(500).json({ message: 'Error fetching quiz details', error });
    }
};

exports.takeQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        const { answers } = req.body;
        let score = 0;

        quiz.questions.forEach((question, index) => {
            if (answers[index] === question.correctAnswer) {
                score++;
            }
        });

        const total = quiz.questions.length;

        res.json({ score, total });
    } 
    catch (error) {
        res.status(500).json({ message: 'Error taking quiz', error });
    }
};
