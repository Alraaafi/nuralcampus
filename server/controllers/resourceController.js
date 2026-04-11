// const Resource = require('../models/Resource');
// const User = require('../models/User');
// const Analytics = require('../models/Analytics');

// exports.uploadResource = async (req, res) => {
//     try {
//         const resource = new Resource({
//             ...req.body,
//             username: req.user.username
//         });
        
//         await resource.save();
        
//         // Update user's upload count
//         await User.findOneAndUpdate(
//             { username: req.user.username },
//             { $inc: { uploadCount: 1 } }
//         );
        
//         // Update analytics based on type
//         let updateField = {};
//         switch(resource.type) {
//             case 'book':
//                 updateField = { $inc: { totalBooks: 1, totalResources: 1 } };
//                 break;
//             case 'slide':
//                 updateField = { $inc: { totalSlides: 1, totalResources: 1 } };
//                 break;
//             case 'note':
//                 updateField = { $inc: { totalNotes: 1, totalResources: 1 } };
//                 break;
//             default:
//                 updateField = { $inc: { totalResources: 1 } };
//         }
        
//         await Analytics.findOneAndUpdate({}, updateField, { upsert: true });
        
//         res.status(201).json(resource);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.getResources = async (req, res) => {
//     try {
//         const { page = 1, limit = 10, search, department, semester, courseName, type, year } = req.query;
//         const query = {};
        
//         if (search) query.title = { $regex: search, $options: 'i' };
//         if (department) query.department = department;
//         if (semester) query.semester = semester;
//         if (courseName) query.courseName = { $regex: courseName, $options: 'i' };
//         if (type) query.type = type;
//         if (year) query.year = year;
        
//         const resources = await Resource.find(query)
//             .sort({ uploadDate: -1 })
//             .limit(limit * 1)
//             .skip((page - 1) * limit);
        
//         const total = await Resource.countDocuments(query);
        
//         res.json({
//             resources,
//             totalPages: Math.ceil(total / limit),
//             currentPage: page,
//             total
//         });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.getResourceById = async (req, res) => {
//     try {
//         const resource = await Resource.findById(req.params.id);
//         if (!resource) {
//             return res.status(404).json({ message: 'Resource not found' });
//         }
//         res.json(resource);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.addReaction = async (req, res) => {
//     try {
//         const resource = await Resource.findByIdAndUpdate(
//             req.params.id,
//             { $inc: { reactionCount: 1 } },
//             { new: true }
//         );
//         res.json(resource);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// // Get Top Contributors with profile pictures
// exports.getTopContributors = async (req, res) => {
//     try {
//         const contributors = await User.find()
//             .sort({ uploadCount: -1 })
//             .limit(10)
//             .select('username uploadCount fullName profilePic department'); // Added profilePic and department
        
//         res.json(contributors);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };




























//v4
// Add reaction to resource (one per user)
const Resource = require('../models/Resource');
const User = require('../models/User');
const Analytics = require('../models/Analytics');

exports.uploadResource = async (req, res) => {
    try {
        const resource = new Resource({
            ...req.body,
            username: req.user.username
        });
        
        await resource.save();
        
        // Update user's upload count
        await User.findOneAndUpdate(
            { username: req.user.username },
            { $inc: { uploadCount: 1 } }
        );
        
        // Update analytics based on type
        let updateField = {};
        switch(resource.type) {
            case 'book':
                updateField = { $inc: { totalBooks: 1, totalResources: 1 } };
                break;
            case 'slide':
                updateField = { $inc: { totalSlides: 1, totalResources: 1 } };
                break;
            case 'note':
                updateField = { $inc: { totalNotes: 1, totalResources: 1 } };
                break;
            default:
                updateField = { $inc: { totalResources: 1 } };
        }
        
        await Analytics.findOneAndUpdate({}, updateField, { upsert: true });
        
        res.status(201).json(resource);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getResources = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, department, semester, courseName, type, year } = req.query;
        const query = {};
        
        if (search) query.title = { $regex: search, $options: 'i' };
        if (department) query.department = department;
        if (semester) query.semester = semester;
        if (courseName) query.courseName = { $regex: courseName, $options: 'i' };
        if (type) query.type = type;
        if (year) query.year = year;
        
        const resources = await Resource.find(query)
            .sort({ uploadDate: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);
        
        const total = await Resource.countDocuments(query);
        
        res.json({
            resources,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getResourceById = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        res.json(resource);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add reaction to resource (one per user)
exports.addReaction = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        
        const userId = req.user.userId;
        const hasReacted = resource.reactedUsers && resource.reactedUsers.some(user => user.userId.toString() === userId);
        
        if (hasReacted) {
            // User has already reacted - remove reaction
            resource.reactedUsers = resource.reactedUsers.filter(user => user.userId.toString() !== userId);
            resource.reactionCount = Math.max(0, resource.reactionCount - 1);
            await resource.save();
            
            return res.json({ 
                success: true, 
                message: 'Reaction removed',
                reactionCount: resource.reactionCount,
                hasReacted: false
            });
        } else {
            // User hasn't reacted - add reaction
            if (!resource.reactedUsers) {
                resource.reactedUsers = [];
            }
            resource.reactedUsers.push({ userId: userId, reactedAt: new Date() });
            resource.reactionCount = (resource.reactionCount || 0) + 1;
            await resource.save();
            
            return res.json({ 
                success: true, 
                message: 'Reaction added',
                reactionCount: resource.reactionCount,
                hasReacted: true
            });
        }
    } catch (err) {
        console.error('Reaction error:', err);
        res.status(500).json({ message: err.message });
    }
};

// Check if user has reacted to resource
exports.checkUserReaction = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        
        const userId = req.user.userId;
        const hasReacted = resource.reactedUsers && resource.reactedUsers.some(user => user.userId.toString() === userId);
        
        res.json({ 
            hasReacted: hasReacted || false,
            reactionCount: resource.reactionCount || 0
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTopContributors = async (req, res) => {
    try {
        const contributors = await User.find()
            .sort({ uploadCount: -1 })
            .limit(10)
            .select('username uploadCount fullName profilePic department');
        res.json(contributors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};