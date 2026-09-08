const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const authMiddleware = require('../middleware/auth');

// All routes
router.post('/submit', authMiddleware, feedbackController.submitFeedback);
router.get('/', feedbackController.getFeedbacks);
router.get('/top', feedbackController.getTopFeedbacks);
router.get('/stats', feedbackController.getAverageRating);

module.exports = router;