const express = require('express');
const router = express.Router();
const defectController = require('../controllers/defect.controller');
const auth = require('../middlewares/auth');

router.get('/', auth, defectController.getDefects);
router.post('/', auth, defectController.createDefect);
router.put('/:id', auth, defectController.updateDefect);

module.exports = router;