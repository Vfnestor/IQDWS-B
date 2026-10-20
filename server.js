// اجبار Node.js به استفاده از IPv4 برای رفع مشکل ENOTFOUND
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
const authRoutes = require('./routes/auth.routes');
const defectRoutes = require('./routes/defect.routes');
const qanRoutes = require('./routes/qan.routes');
const eightdRoutes = require('./routes/eightd.routes');
const bugRoutes = require('./routes/bug.routes');
const supplierRoutes = require('./routes/supplier.routes');
const settingsRoutes = require('./routes/settings.routes');

app.use('/api/auth', authRoutes);
app.use('/api/defects', defectRoutes);
app.use('/api/qans', qanRoutes);
app.use('/api/eightd', eightdRoutes);
app.use('/api/bugs', bugRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/settings', settingsRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok', env: process.env.MONGODB_URI ? 'Cloud' : 'Local' }));

// ابتدا سرور روشن می‌شود، سپس به دیتابیس وصل می‌شویم
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    connectDB().catch(err => console.error("DB Error:", err));
});