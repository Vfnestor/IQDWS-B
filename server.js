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
const eightdRoutes = require('./routes/eightd.routes');
const bugRoutes = require('./routes/bug.routes');
const supplierRoutes = require('./routes/supplier.routes');
const settingsRoutes = require('./routes/settings.routes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // مسیر جدید کاربران
app.use('/api/defects', defectRoutes);
app.use('/api/qans', qanRoutes);
app.use('/api/eightd', eightdRoutes);
app.use('/api/bugs', bugRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/settings', settingsRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok', env: 'Cloud' }));

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    connectDB().catch(err => console.error("DB Error:", err));
});