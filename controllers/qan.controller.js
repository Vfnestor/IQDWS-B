const { readDB, writeDB } = require('../config/db');

exports.getQANs = (req, res) => {
    const db = readDB();
    res.json(db.qans || []);
};

exports.createQAN = (req, res) => {
    const db = readDB();
    if (!db.qans) db.qans = [];
    
    const newQAN = {
        id: 'QAN-' + Date.now(),
        defectId: req.body.defectId,
        title: req.body.title,
        level: req.body.level || 'L2',
        penalty: req.body.penalty || 0,
        status: 'pending_dept', // مراحل: pending_dept -> pending_office -> sent
        createdBy: req.user.role,
        createdAt: new Date().toISOString()
    };

    db.qans.push(newQAN);
    writeDB(db);
    res.status(201).json(newQAN);
};

exports.updateQANStatus = (req, res) => {
    const db = readDB();
    const index = db.qans.findIndex(q => q.id === req.params.id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'اخطار یافت نشد' });
    }

    db.qans[index].status = req.body.status;
    writeDB(db);
    res.json(db.qans[index]);
};