const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'db.json');

const connectDB = async () => {
    if (process.env.MONGODB_URI) {
        try {
            await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
            console.log('✅ Connected to MongoDB Atlas (Cloud)');
        } catch (err) {
            console.error('❌ MongoDB connection error:', err.message);
        }
    } else {
        console.log('⚠️ Running with local JSON database (db.json)');
    }
};

module.exports = { connectDB };