const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'db.json');

// اگر در حالت لوکال بودیم و فایل نبود، بساز
if (!process.env.MONGODB_URI && !fs.existsSync(dbPath)) {
    const initialData = { defects: [], qans: [], eightd: [], suppliers: [], bugs: [] };
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
}

// تابع اتصال به دیتابیس (این همان چیزی است که ارور می‌داد)
const connectDB = async () => {
    if (process.env.MONGODB_URI) {
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('✅ Connected to MongoDB Atlas (Cloud)');
        } catch (err) {
            console.error('❌ MongoDB connection error:', err);
        }
    } else {
        console.log('⚠️ Running with local JSON database (db.json)');
    }
};

// توابع قدیمی برای پشتیبانی از حالت آفلاین/لوکال
const readDB = () => {
    if (process.env.MONGODB_URI) return null;
    return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
};

const writeDB = (data) => {
    if (process.env.MONGODB_URI) return;
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

module.exports = { connectDB, readDB, writeDB };