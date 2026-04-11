// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const rateLimit = require('express-rate-limit');
// const multer = require('multer');
// const path = require('path');
// require('dotenv').config();

// const connectDB = require('./config/database');

// const app = express();

// // Connect to Database (using your MongoDB Atlas connection)
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// // Rate limiting
// const limiter = rateLimit({
//     windowMs: 20 * 60 * 1000, // 15 minutes
//     max: 100
// });
// app.use(limiter);

// // Remove this old localhost connection - NOT NEEDED ANYMORE
// // mongoose.connect('mongodb://localhost:27017/nuralcampus', {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true
// // }).then(() => console.log('MongoDB connected'))
// //   .catch(err => console.log(err));

// // Import Routes
// const authRoutes = require('./routes/authRoutes');
// const resourceRoutes = require('./routes/resourceRoutes');
// const analyticsRoutes = require('./routes/analyticsRoutes');
// const userRoutes = require('./routes/userRoutes');

// // Use Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/resources', resourceRoutes);
// app.use('/api/analytics', analyticsRoutes);
// app.use('/api/users', userRoutes);

// // Test route to check connection
// app.get('/api/test', (req, res) => {
//     res.json({ 
//         message: 'NuralCampus API Running',
//         dbStatus: mongoose.connection.readyState === 1 ? 'Connected to Atlas' : 'Disconnected'
//     });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
















//v1
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const connectDB = require('./config/database');

const app = express();

// Connect to Database
connectDB();

// Ensure uploads directory exists
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'));
    }
};

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: fileFilter
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Rate limiting
// Rate limiting - Increased limits
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour (changed from 15 minutes)
    max: 1000, // Increased from 100 to 1000 requests per hour
    message: 'Too many requests, please try again after an hour.',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

// Import auth middleware AFTER app initialization but BEFORE using it
const authMiddleware = require('./middleware/auth');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const userRoutes = require('./routes/userRoutes');




// Add this after your existing multer configuration

// Configure multer for resource cover images
const resourceStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/resources/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'cover-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const resourceFileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only image files are allowed for cover'));
    }
};

const uploadResourceCover = multer({ 
    storage: resourceStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: resourceFileFilter
});

// Create resources directory if it doesn't exist
const resourcesDir = './uploads/resources';
if (!fs.existsSync(resourcesDir)){
    fs.mkdirSync(resourcesDir, { recursive: true });
}

// New route for uploading resource cover image
app.post('/api/upload-resource-cover', authMiddleware, uploadResourceCover.single('coverImage'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        
        const imageUrl = `http://localhost:5000/uploads/resources/${req.file.filename}`;
        
        res.json({ 
            success: true, 
            message: 'Cover image uploaded successfully',
            coverUrl: imageUrl
        });
        
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: error.message });
    }
});


// Profile picture upload route (MUST be after authMiddleware import)
// Profile picture upload route - FIXED VERSION
app.post('/api/upload-profile-pic', authMiddleware, upload.single('profilePic'), async (req, res) => {
    try {
        console.log('=== STARTING UPLOAD PROCESS ===');
        
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        
        const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
        console.log('Image URL to save:', imageUrl);
        console.log('User ID:', req.user.userId);
        
        const User = require('./models/User');
        
        // Find the user first to check if exists
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        console.log('Current user profilePic before update:', user.profilePic);
        
        // Method 1: Direct assignment and save
        user.profilePic = imageUrl;
        await user.save();
        
        console.log('After save - user profilePic:', user.profilePic);
        
        // Verify the update by fetching again
        const verifiedUser = await User.findById(req.user.userId);
        console.log('Verified from DB - profilePic:', verifiedUser.profilePic);
        
        // Remove password from response
        const userResponse = verifiedUser.toObject();
        delete userResponse.password;
        
        res.json({ 
            success: true, 
            message: 'Profile picture updated successfully',
            profilePic: imageUrl,
            user: userResponse
        });
        
        console.log('=== UPLOAD COMPLETED SUCCESSFULLY ===');
        
    } catch (error) {
        console.error('Upload error details:', error);
        res.status(500).json({ message: error.message });
    }
});

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));