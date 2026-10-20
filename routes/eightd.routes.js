const express = require('express');
const router = express.Router();
const eightdController = require('../controllers/eightd.controller');
const auth = require('../middlewares/auth');

router.get('/', auth, eightdController.get8Ds);
router.get('/qan/:qanId', auth, eightdController.get8DByQAN);
router.post('/', auth, eightdController.save8D);

module.exports = router;