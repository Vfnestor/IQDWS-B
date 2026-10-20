const { readDB, writeDB } = require('../config/db');

exports.getQANs = (req, res) => {
    const db = readDB();
    res.json(db.qans || []);
};

exports.getQANById = (req, res) => {
    const db = readDB();
    const qan = (db.qans || []).find(q => q.id === req.params.id);
    if (!qan) return res.status(404).json({ error: 'اخطار یافت نشد' });
    res.json(qan);
};

exports.createQAN = (req, res) => {
    const db = readDB();
    if (!db.qans) db.qans = [];
    
    const newQAN = {
        id: 'QAN-' + Date.now(),
        defectId: req.body.defectId,
        title: req.body.title,
        level: req.body.level,
        penalty: req.body.penalty,
        status: 'pending_dept',
        createdBy: req.user.role,
        createdAt: new Date().toISOString()
    };

    db.qans.push(newQAN);
    
    if (db.defects) {
        const defectIdx = db.defects.findIndex(d => d.id === req.body.defectId);
        if (defectIdx !== -1) {
            db.defects[defectIdx].qanId = newQAN.id;
            db.defects[defectIdx].status = 'qan_pending'; 
        }
    }

    writeDB(db);
    res.status(201).json(newQAN);
};

exports.updateQANStatus = (req, res) => {
    const db = readDB();
    const index = db.qans.findIndex(q => q.id === req.params.id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'اخطار یافت نشد' });
    }

    const newStatus = req.body.status;
    db.qans[index].status = newStatus;

    // بروزرسانی وضعیت ایراد مرتبط بر اساس وضعیت اخطار
    const defectIdx = db.defects.findIndex(d => d.id === db.qans[index].defectId);
    if (defectIdx !== -1) {
        if (newStatus === 'sent') db.defects[defectIdx].status = 'qan_sent';
        if (newStatus === 'responded') db.defects[defectIdx].status = 'response_review';
        if (newStatus === 'closed') db.defects[defectIdx].status = 'closed'; // بستن نهایی ایراد
    }

    writeDB(db);
    res.json(db.qans[index]);
};