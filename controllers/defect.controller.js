const { readDB, writeDB } = require('../config/db');
const { Defect } = require('../models');

// دریافت لیست ایرادها
exports.getDefects = async (req, res) => {
    if (process.env.MONGODB_URI) {
        const defects = await Defect.find().sort({ createdAt: -1 });
        return res.json(defects);
    }
    res.json(readDB().defects || []);
};

// ثبت ایراد جدید
exports.createDefect = async (req, res) => {
    const newDefect = { 
        ...req.body, 
        status: 'registered', 
        createdBy: req.user.role, 
        createdAt: new Date().toISOString() 
    };
    
    if (process.env.MONGODB_URI) {
        const saved = await new Defect(newDefect).save();
        return res.status(201).json(saved);
    }
    
    const db = readDB();
    if (!db.defects) db.defects = [];
    newDefect.id = 'DEF-' + Date.now();
    db.defects.push(newDefect);
    writeDB(db);
    res.status(201).json(newDefect);
};

// بروزرسانی ایراد (همان تابعی که جا افتاده بود)
exports.updateDefect = async (req, res) => {
    if (process.env.MONGODB_URI) {
        const updated = await Defect.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'ایراد یافت نشد' });
        return res.json(updated);
    }

    const db = readDB();
    const index = (db.defects || []).findIndex(d => d.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'ایراد یافت نشد' });

    db.defects[index] = { ...db.defects[index], ...req.body };
    writeDB(db);
    res.json(db.defects[index]);
};