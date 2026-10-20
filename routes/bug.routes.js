const express = require('express');
const router = express.Router();
const bugController = require('../controllers/bug.controller');
const auth = require('../middlewares/auth');

router.get('/', auth, bugController.getBugs);
router.post('/', auth, bugController.createBug);
router.put('/:id/resolve', auth, bugController.resolveBug);

module.exports = router;