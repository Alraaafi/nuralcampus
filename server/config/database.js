const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const URI = process.env.MONGODB_URI;

        if (!URI) {
            throw new Error('MONGODB_URI is not configured');
        }
        
        // Connect to database
        await mongoose.connect(URI, { autoIndex: true });
        
        console.log('✅ MongoDB Atlas Connected Successfully');
        console.log('📚 Database Name:', mongoose.connection.db.databaseName);
        
    } catch (error) {
        console.error('❌ Connection Failed:', error.message);
        // Exit process if connection fails
        process.exit(1);
    }
};

module.exports = connectDB;