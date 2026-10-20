const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'db.json');

const connectDB = async () => {
    if (process.env.MONGODB_URI) {
        try {
            await mongoose.connect(process.env.MONGODB_URI, {
                serverSelectionTimeoutMS: 10000 
            });
            console.log('✅ Connected to MongoDB Atlas (Cloud)');
        } catch (err) {
            console.error('❌ MongoDB connection error:', err.message);
        }
    } else {
        console.log('⚠️ Running with local JSON database (db.json)');
    }
};

const readDB = () => {
    // اگر از دیتابیس ابری استفاده می‌کنیم، یک آبجکت خالی برگردان تا کد کرش نکند
    if (process.env.MONGODB_URI) return {}; 
    
    if (!fs.existsSync(dbPath)) return { defects: [], qans: [], eightd: [], suppliers: [], bugs: [] };
    return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
};

const writeDB = (data) => {
    if (process.env.MONGODB_URI) return;
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

module.exports = { connectDB, readDB, writeDB };