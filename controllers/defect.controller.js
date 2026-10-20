const { readDB, writeDB } = require('../config/db');

exports.getDefects = (req, res) => {
    const db = readDB();
    res.json(db.defects);
};

exports.createDefect = (req, res) => {
    const db = readDB();
    
    const newDefect = {
        id: 'DEF-' + Date.now(),
        title: req.body.title,
        vin: req.body.vin,
        severity: req.body.severity,
        qty: req.body.qty,
        desc: req.body.desc,
        status: 'registered',
        createdBy: req.user.role,
        createdAt: new Date().toISOString()
    };

    db.defects.push(newDefect);
    writeDB(db);

    res.status(201).json(newDefect);
};

exports.updateDefect = (req, res) => {
    const db = readDB();
    const index = db.defects.findIndex(d => d.id === req.params.id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'ایراد یافت نشد' });
    }

    db.defects[index] = { ...db.defects[index], ...req.body };
    writeDB(db);

    res.json(db.defects[index]);
};