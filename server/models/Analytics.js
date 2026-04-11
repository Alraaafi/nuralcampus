const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
    totalParticipants: {
        type: Number,
        default: 0
    },
    totalBooks: {
        type: Number,
        default: 0
    },
    totalSlides: {
        type: Number,
        default: 0
    },
    totalNotes: {
        type: Number,
        default: 0
    },
    totalResources: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Analytics', AnalyticsSchema);