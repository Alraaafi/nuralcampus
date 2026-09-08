const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/auth');

router.post('/add', authMiddleware, commentController.addComment);
router.get('/:resourceId', commentController.getComments);
router.delete('/:commentId', authMiddleware, commentController.deleteComment);
router.put('/:commentId/like', authMiddleware, commentController.likeComment);
router.put('/:commentId/edit', authMiddleware, commentController.editComment);
router.post('/:commentId/reply', authMiddleware, commentController.addReply);

module.exports = router;