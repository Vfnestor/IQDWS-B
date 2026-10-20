require('dotenv').config();
const mongoose = require('mongoose');
const { User } = require('./models');

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB for seeding...');

        // چک کردن اینکه آیا ادمین وجود دارد یا خیر
        const adminExists = await User.findOne({ username: 'admin' });
        
        if (!adminExists) {
            const admin = new User({
                username: 'admin',
                password: 'admin', // در نسخه نهایی حتما هش شود
                role: 'sys_admin',
                firstName: 'مدیر',
                lastName: 'سیستم',
                isFirstLogin: false
            });
            await admin.save();
            console.log('✅ Default admin user created. (admin / admin)');
        } else {
            console.log('ℹ️ Admin user already exists.');
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();