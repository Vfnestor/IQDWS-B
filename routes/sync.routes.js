const express = require('express');
const router = express.Router();
const syncController = require('../controllers/sync.controller');
const auth = require('../middlewares/auth');

// Claims
router.get('/claims', auth, syncController.getClaims);
router.post('/claims', auth, syncController.createClaim);

// Analysis
router.get('/analysis', auth, syncController.getAnalysis);
router.post('/analysis', auth, syncController.createAnalysis);

// Operator Errors
router.get('/operator-errors', auth, syncController.getOperatorErrors);
router.post('/operator-errors', auth, syncController.createOperatorError);
router.delete('/operator-errors/:id', auth, syncController.deleteOperatorError);

// Notifications
router.get('/notifications/:username', auth, syncController.getNotifications);
router.post('/notifications', auth, syncController.createNotification);

// Audit Logs
router.post('/audit-logs', auth, syncController.createAuditLog);

module.exports = router;