const express = require('express');
const router = express.Router();
const qanController = require('../controllers/qan.controller');
const auth = require('../middlewares/auth');

router.get('/', auth, qanController.getQANs);
router.post('/', auth, qanController.createQAN);
router.put('/:id/status', auth, qanController.updateQANStatus);

module.exports = router;