// const mongoose = require('mongoose');

// const ResourceSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     coverPic: {
//         type: String,
//         required: true
//     },
//     department: {
//         type: String,
//         required: true,
//         enum: ['CSE', 'EEE', 'MATH', 'Fisheries', 'Social Work', 'Management', 'Geology']
//     },
//     year: {
//         type: String,
//         required: true,
//         enum: ['1st', '2nd', '3rd', '4th']
//     },
//     semester: {
//         type: String,
//         required: true,
//         enum: ['1st', '2nd']
//     },
//     courseName: {
//         type: String,
//         required: true
//     },
//     downloadLink: {
//         type: String,
//         required: true
//     },
//     type: {
//         type: String,
//         required: true,
//         enum: ['book', 'slide', 'note', 'others']
//     },
//     uploadDate: {
//         type: Date,
//         default: Date.now
//     },
//     reactionCount: {
//         type: Number,
//         default: 0
//     },
//     username: {
//         type: String,
//         required: true,
//         ref: 'User'
//     }
// });

// module.exports = mongoose.model('Resource', ResourceSchema);



















//v4
const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add title'],
        unique: true,
        trim: true
    },
    coverPic: {
        type: String,
        required: [true, 'Please add cover image URL'],
        default: 'https://via.placeholder.com/400x300?text=Resource+Cover'
    },
    department: {
        type: String,
        required: true,
        enum: ['CSE', 'EEE', 'MATH', 'Fisheries', 'Social Work', 'Management', 'Geology']
    },
    year: {
        type: String,
        required: true,
        enum: ['1st', '2nd', '3rd', '4th']
    },
    semester: {
        type: String,
        required: true,
        enum: ['1st', '2nd']
    },
    courseName: {
        type: String,
        required: [true, 'Please add course name'],
        trim: true
    },
    downloadLink: {
        type: String,
        required: [true, 'Please add download link']
    },
    type: {
        type: String,
        required: true,
        enum: ['book', 'slide', 'note', 'others']
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    reactionCount: {
        type: Number,
        default: 0
    },
    reactedUsers: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        reactedAt: {
            type: Date,
            default: Date.now
        }
    }],
    username: {
        type: String,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Resource', ResourceSchema);