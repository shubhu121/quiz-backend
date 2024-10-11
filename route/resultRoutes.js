const express = require('express');
const { viewResults } = require('../controllers/resultController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, viewResults);

module.exports = router;
