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