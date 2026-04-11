const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Your connection string
        const URI = "mongodb+srv://rafi:rafi1234@rafidb.q3wmjqb.mongodb.net/nuralcampus";
        
        // Your options
        const OPTIONS = {
            user: 'rafi',
            pass: 'rafi1234',
            autoIndex: true,
        };
        
        // Connect to database
        await mongoose.connect(URI, OPTIONS);
        
        console.log('✅ MongoDB Atlas Connected Successfully');
        console.log('📚 Database Name:', mongoose.connection.db.databaseName);
        
    } catch (error) {
        console.error('❌ Connection Failed:', error.message);
        // Exit process if connection fails
        process.exit(1);
    }
};

module.exports = connectDB;