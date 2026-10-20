require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // اجازه دادن به فرانت‌اند برای اتصال
app.use(express.json()); // پارس کردن JSON

// Routes
const authRoutes = require('./routes/auth.routes');
const defectRoutes = require('./routes/defect.routes');

app.use('/api/auth', authRoutes);
app.use('/api/defects', defectRoutes);

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'IQDWS Backend is running perfectly!' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});