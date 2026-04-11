const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        primaryKey: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true,
        enum: ['CSE', 'EEE', 'MATH', 'Fisheries', 'Social Work', 'Management', 'Geology']
    },
    institute: {
        type: String,
        required: true
    },
    uploadCount: {
        type: Number,
        default: 0
    },
    profilePic: {
        type: String,
        default: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);