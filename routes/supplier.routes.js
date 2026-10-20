const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics.controller');
const auth = require('../middlewares/auth');

router.get('/', auth, analyticsController.getSuppliers);

module.exports = router;