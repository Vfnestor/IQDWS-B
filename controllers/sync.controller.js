const { Claim, AnalysisTask, OperatorError, Notification, AuditLog } = require('../models');

// Claims
exports.createClaim = async (req, res) => {
    try { const c = new Claim(req.body); await c.save(); res.status(201).json(c); } 
    catch (e) { res.status(500).json({ error: e.message }); }
};
exports.getClaims = async (req, res) => {
    try { const c = await Claim.find().sort({ createdAt: -1 }); res.json(c); } 
    catch (e) { res.status(500).json({ error: e.message }); }
};

// Analysis Tasks
exports.createAnalysis = async (req, res) => {
    try { const a = new AnalysisTask(req.body); await a.save(); res.status(201).json(a); } 
    catch (e) { res.status(500).json({ error: e.message }); }
};
exports.getAnalysis = async (req, res) => {
    try { const a = await AnalysisTask.find().sort({ createdAt: -1 }); res.json(a); } 
    catch (e) { res.status(500).json({ error: e.message }); }
};

// Operator Errors
exports.createOperatorError = async (req, res) => {
    try { const o = new OperatorError(req.body); await o.save(); res.status(201).json(o); } 
    catch (e) { res.status(500).json({ error: e.message }); }
};
exports.getOperatorErrors = async (req, res) => {
    try { const o = await OperatorError.find().sort({ date: -1 }); res.json(o); } 
    catch (e) { res.status(500).json({ error: e.message }); }
};
exports.deleteOperatorError = async (req, res) => {
    try { await OperatorError.findOneAndDelete({ errorId: req.params.id }); res.json({ message: 'Deleted' }); } 
    catch (e) { res.status(500).json({ error: e.message }); }
};

// Notifications
exports.getNotifications = async (req, res) => {
    try { 
        const n = await Notification.find({ targetUser: { $in: [req.params.username, 'all'] } }).sort({ date: -1 }); 
        res.json(n); 
    } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.createNotification = async (req, res) => {
    try { const n = new Notification(req.body); await n.save(); res.status(201).json(n); } 
    catch (e) { res.status(500).json({ error: e.message }); }
};

// Audit Logs
exports.createAuditLog = async (req, res) => {
    try { const l = new AuditLog(req.body); await l.save(); res.status(201).json(l); } 
    catch (e) { res.status(500).json({ error: e.message }); }
};