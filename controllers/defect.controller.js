const { readDB, writeDB } = require('../config/db');
const { Defect } = require('../models');

exports.getDefects = async (req, res) => {
    if (process.env.MONGODB_URI) {
        const defects = await Defect.find().sort({ createdAt: -1 });
        return res.json(defects);
    }
    res.json(readDB().defects || []);
};

exports.createDefect = async (req, res) => {
    try {
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
    } catch (error) {
        console.error("Error creating defect:", error);
        res.status(500).json({ error: 'خطای داخلی سرور. لطفاً لاگ‌ها را بررسی کنید.' });
    }
};

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