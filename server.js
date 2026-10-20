require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth.routes');
const defectRoutes = require('./routes/defect.routes');
const qanRoutes = require('./routes/qan.routes');
const eightdRoutes = require('./routes/eightd.routes');
const supplierRoutes = require('./routes/supplier.routes');
const analyticsRoutes = require('./routes/analytics.routes');

app.use('/api/auth', authRoutes);
app.use('/api/defects', defectRoutes);
app.use('/api/qans', qanRoutes);
app.use('/api/eightd', eightdRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});