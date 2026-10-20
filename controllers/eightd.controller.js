const { readDB, writeDB } = require('../config/db');

exports.get8Ds = (req, res) => {
    const db = readDB();
    res.json(db.eightd || []);
};

exports.get8DByQAN = (req, res) => {
    const db = readDB();
    const eightd = (db.eightd || []).find(e => e.qanId === req.params.qanId);
    if (!eightd) return res.status(404).json({ error: 'پاسخی یافت نشد' });
    res.json(eightd);
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
        createdBy: req.user.role,
        createdAt: new Date().toISOString()
    };

    db.eightd.push(new8D);
    
    // تغییر وضعیت اخطار به دریافت پاسخ
    const qanIndex = db.qans.findIndex(q => q.id === req.body.qanId);
    if (qanIndex !== -1) {
        db.qans[qanIndex].status = 'responded';
    }

    writeDB(db);
    res.status(201).json(new8D);
};