const Analytics = require('../models/Analytics');
const User = require('../models/User');
const Resource = require('../models/Resource');

exports.getStats = async (req, res) => {
    try {
        let stats = await Analytics.findOne();
        if (!stats) {
            const totalUsers = await User.countDocuments();
            const totalBooks = await Resource.countDocuments({ type: 'book' });
            const totalSlides = await Resource.countDocuments({ type: 'slide' });
            const totalNotes = await Resource.countDocuments({ type: 'note' });
            const totalResources = await Resource.countDocuments();
            
            stats = {
                totalParticipants: totalUsers,
                totalBooks,
                totalSlides,
                totalNotes,
                totalResources
            };
        }
        res.json(stats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};