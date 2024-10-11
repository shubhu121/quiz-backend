const Result = require('../models/Result');

exports.viewResults = async (req, res) => {
    try {
        const results = await Result.find({ user: req.user.id }).populate('quiz');
        res.json(results);
    } 
    catch (error) {
        res.status(500).json({ message: 'Error fetching results', error });
    }
};
