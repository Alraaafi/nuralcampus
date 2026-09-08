const Feedback = require('../models/Feedback');

// Submit new feedback
exports.submitFeedback = async (req, res) => {
    try {
        console.log('Received feedback:', req.body);
        console.log('User from token:', req.user);
        
        const { userName, userEmail, rating, title, comment } = req.body;
        
        // Validate required fields
        if (!userName || !userEmail || !rating || !title || !comment) {
            return res.status(400).json({ 
                success: false, 
                message: 'All fields are required' 
            });
        }
        
        const feedback = new Feedback({
            userName,
            userEmail,
            rating,
            title,
            comment,
            userId: req.user ? req.user.userId : null,
            isApproved: true // Auto-approve for testing
        });
        
        await feedback.save();
        console.log('Feedback saved successfully:', feedback);
        
        res.status(201).json({
            success: true,
            message: 'Thank you for your feedback!'
        });
    } catch (err) {
        console.error('Error saving feedback:', err);
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
};

// Get all approved feedbacks
exports.getFeedbacks = async (req, res) => {
    try {
        const { limit = 10, page = 1 } = req.query;
        
        const feedbacks = await Feedback.find({ isApproved: true })
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));
        
        const total = await Feedback.countDocuments({ isApproved: true });
        
        console.log(`Found ${feedbacks.length} feedbacks`);
        
        res.json({
            success: true,
            feedbacks,
            total,
            totalPages: Math.ceil(total / parseInt(limit)),
            currentPage: parseInt(page)
        });
    } catch (err) {
        console.error('Error fetching feedbacks:', err);
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
};

// Get top rated feedbacks
exports.getTopFeedbacks = async (req, res) => {
    try {
        const { limit = 10 } = req.query;
        
        const feedbacks = await Feedback.find({ isApproved: true })
            .sort({ rating: -1, createdAt: -1 })
            .limit(parseInt(limit));
        
        console.log(`Found ${feedbacks.length} top feedbacks`);
        
        res.json({
            success: true,
            feedbacks,
            total: feedbacks.length
        });
    } catch (err) {
        console.error('Error fetching top feedbacks:', err);
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
};

// Get average rating
exports.getAverageRating = async (req, res) => {
    try {
        const result = await Feedback.aggregate([
            { $match: { isApproved: true } },
            { 
                $group: { 
                    _id: null, 
                    averageRating: { $avg: "$rating" }, 
                    totalReviews: { $sum: 1 } 
                } 
            }
        ]);
        
        res.json({
            success: true,
            averageRating: result[0]?.averageRating || 0,
            totalReviews: result[0]?.totalReviews || 0
        });
    } catch (err) {
        console.error('Error fetching stats:', err);
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
};