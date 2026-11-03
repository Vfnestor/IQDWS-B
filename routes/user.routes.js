const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

router.get('/', auth, userController.getUsers);
router.post('/', auth, userController.createUser);
router.get('/:username/activity', auth, userController.getUserActivity);
router.put('/:username', auth, userController.updateUser);
router.delete('/:username', auth, userController.deleteUser);

module.exports = router;