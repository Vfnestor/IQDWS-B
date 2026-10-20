const { readDB, writeDB } = require('../config/db');

exports.get8Ds = (req, res) => {
    const db = readDB();
    res.json(db.eightd || []);
};

exports.save8D = (req, res) => {
    const db = readDB();
    if (!db.eightd) db.eightd = [];

    const new8D = {
        id: '8D-' + Date.now(),
        qanId: req.body.qanId,
        d1_team: req.body.d1_team,
        d2_problem: req.body.d2_problem,
        d3_containment: req.body.d3_containment,
        d4_root_cause: req.body.d4_root_cause,
        d5_capa: req.body.d5_capa,
        status: 'submitted',
        createdBy: req.user.role,
        createdAt: new Date().toISOString()
    };

    db.eightd.push(new8D);
    
    // به‌روزرسانی وضعیت اخطار مرتبط
    const qanIndex = db.qans.findIndex(q => q.id === req.body.qanId);
    if (qanIndex !== -1) {
        db.qans[qanIndex].status = 'responded';
    }

    writeDB(db);
    res.status(201).json(new8D);
};