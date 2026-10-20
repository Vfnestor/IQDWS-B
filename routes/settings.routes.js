const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

// بررسی سلامت سیستم و تنظیمات
router.get('/health', auth, (req, res) => {
    res.json({
        status: 'online',
        database: 'connected (JSON-based)',
        version: '1.0.0-beta',
        uptime: process.uptime()
    });
});

module.exports = router;