const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
dns.setDefaultResultOrder('ipv4first');

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const defectRoutes = require('./routes/defect.routes');
const qanRoutes = require('./routes/qan.routes');
const syncRoutes = require('./routes/sync.routes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/defects', defectRoutes);
app.use('/api/qans', qanRoutes);
app.use('/api/sync', syncRoutes); // مسیرهای جدید

app.get('/api/health', (req, res) => res.json({ status: 'ok', env: process.env.MONGODB_URI ? 'Cloud' : 'Local' }));

app.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);
    await connectDB();
    
    // ساخت خودکار کاربر ادمین در صورت خالی بودن دیتابیس
    try {
        const { User } = require('./models');
        const adminExists = await User.findOne({ username: 'admin' });
        if (!adminExists) {
            await new User({
                username: 'admin', password: 'admin', role: 'sys_admin',
                firstName: 'وحید', lastName: 'فدایی', isFirstLogin: false
            }).save();
            console.log('✅ Default Admin User Created (admin / admin)');
        }
    } catch (err) { console.error("Seed Error:", err.message); }
});