const { readDB, writeDB } = require('../config/db');

exports.getBugs = (req, res) => {
    const db = readDB();
    res.json(db.bugs || []);
};

exports.createBug = (req, res) => {
    const db = readDB();
    if (!db.bugs) db.bugs = [];
    
    const newBug = {
        id: 'BUG-' + Date.now(),
        title: req.body.title,
        priority: req.body.priority,
        status: 'open',
        reportedBy: req.user.role,
        createdAt: new Date().toISOString()
    };

    db.bugs.unshift(newBug); // جدیدترین‌ها اول لیست
    writeDB(db);
    res.status(201).json(newBug);
};

exports.resolveBug = (req, res) => {
    const db = readDB();
    const index = (db.bugs || []).findIndex(b => b.id === req.params.id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'باگ یافت نشد' });
    }

    db.bugs[index].status = 'resolved';
    db.bugs[index].resolvedAt = new Date().toISOString();
    writeDB(db);
    res.json(db.bugs[index]);
};