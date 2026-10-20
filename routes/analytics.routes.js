const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics.controller');
const auth = require('../middlewares/auth');

router.get('/dashboard', auth, analyticsController.getDashboardStats);

module.exports = router;