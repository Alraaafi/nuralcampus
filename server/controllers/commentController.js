const Comment = require('../models/Comment');
const User = require('../models/User');

// Add comment to resource
exports.addComment = async (req, res) => {
    try {
        const { resourceId, comment } = req.body;
        const userId = req.user.userId;
        
        // Get user details from database
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!comment || comment.trim() === '') {
            return res.status(400).json({ message: 'Comment cannot be empty' });
        }

        const newComment = new Comment({
            resourceId,
            userId,
            userName: user.fullName || user.username,
            userEmail: user.email,
            userAvatar: user.profilePic || '',
            comment: comment.trim(),
            createdAt: new Date()
        });

        await newComment.save();

        res.status(201).json({
            success: true,
            message: 'Comment added successfully',
            comment: {
                ...newComment._doc,
                userId: { _id: user._id, fullName: user.fullName, username: user.username, profilePic: user.profilePic }
            }
        });
    } catch (err) {
        console.error('Error adding comment:', err);
        res.status(500).json({ message: err.message });
    }
};

// Get comments for a resource
exports.getComments = async (req, res) => {
    try {
        const { resourceId } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const comments = await Comment.find({ resourceId })
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('userId', 'fullName username profilePic');

        const total = await Comment.countDocuments({ resourceId });

        res.json({
            success: true,
            comments,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page)
        });
    } catch (err) {
        console.error('Error fetching comments:', err);
        res.status(500).json({ message: err.message });
    }
};

// Delete comment
exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.userId;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if user owns the comment
        if (comment.userId.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized to delete this comment' });
        }

        await comment.deleteOne();

        res.json({
            success: true,
            message: 'Comment deleted successfully'
        });
    } catch (err) {
        console.error('Error deleting comment:', err);
        res.status(500).json({ message: err.message });
    }
};

// Like/Unlike comment
exports.likeComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.userId;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const hasLiked = comment.likes.includes(userId);

        if (hasLiked) {
            comment.likes = comment.likes.filter(id => id.toString() !== userId);
        } else {
            comment.likes.push(userId);
        }

        await comment.save();

        res.json({
            success: true,
            likes: comment.likes.length,
            hasLiked: !hasLiked
        });
    } catch (err) {
        console.error('Error liking comment:', err);
        res.status(500).json({ message: err.message });
    }
};

// Edit comment
exports.editComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { comment } = req.body;
        const userId = req.user.userId;

        const existingComment = await Comment.findById(commentId);

        if (!existingComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (existingComment.userId.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized to edit this comment' });
        }

        existingComment.comment = comment.trim();
        existingComment.isEdited = true;
        existingComment.updatedAt = new Date();
        await existingComment.save();

        res.json({
            success: true,
            message: 'Comment updated successfully',
            comment: existingComment
        });
    } catch (err) {
        console.error('Error editing comment:', err);
        res.status(500).json({ message: err.message });
    }
};

// Add reply to comment
exports.addReply = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { reply } = req.body;
        const userId = req.user.userId;
        
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        comment.replies.push({
            userId,
            userName: user.fullName || user.username,
            comment: reply.trim(),
            createdAt: new Date()
        });

        await comment.save();

        res.json({
            success: true,
            message: 'Reply added successfully',
            replies: comment.replies
        });
    } catch (err) {
        console.error('Error adding reply:', err);
        res.status(500).json({ message: err.message });
    }
};