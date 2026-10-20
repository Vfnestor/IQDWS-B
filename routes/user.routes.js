const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

// این مسیرها فقط باید توسط مدیر سیستم (sys_admin) قابل دسترسی باشند
router.get('/', auth, userController.getUsers);
router.post('/', auth, userController.createUser);
router.get('/:username/activity', auth, userController.getUserActivity);

module.exports = router;