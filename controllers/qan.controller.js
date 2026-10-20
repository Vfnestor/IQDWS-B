const { readDB, writeDB } = require('../config/db');
const { QAN } = require('../models'); // اضافه کردن مدل QAN

exports.getQANs = async (req, res) => {
    try {
        if (process.env.MONGODB_URI) {
            const qans = await QAN.find().sort({ createdAt: -1 });
            return res.json(qans);
        }
        const db = readDB();
        res.json(db.qans || []);
    } catch (error) {
        console.error("Error getting QANs:", error.message);
        res.status(500).json({ error: 'خطا در ارتباط با دیتابیس' });
    }
};

// بقیه توابع (createQAN و updateQANStatus) برای حالت ابری فعلاً اینطور می‌شوند:
exports.createQAN = async (req, res) => {
    try {
        const newQAN = {
            ...req.body,
            status: 'pending_dept',
            createdBy: req.user.role,
            createdAt: new Date().toISOString()
        };

        if (process.env.MONGODB_URI) {
            const saved = await new QAN(newQAN).save();
            return res.status(201).json(saved);
        }

        const db = readDB();
        if (!db.qans) db.qans = [];
        newQAN.id = 'QAN-' + Date.now();
        db.qans.push(newQAN);
        writeDB(db);
        res.status(201).json(newQAN);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getQANById = async (req, res) => {
    if (process.env.MONGODB_URI) {
        const qan = await QAN.findById(req.params.id);
        if (!qan) return res.status(404).json({ error: 'اخطار یافت نشد' });
        return res.json(qan);
    }
    const db = readDB();
    const qan = (db.qans || []).find(q => q.id === req.params.id);
    if (!qan) return res.status(404).json({ error: 'اخطار یافت نشد' });
    res.json(qan);
};

exports.updateQANStatus = async (req, res) => {
    if (process.env.MONGODB_URI) {
        const updated = await QAN.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        if (!updated) return res.status(404).json({ error: 'اخطار یافت نشد' });
        return res.json(updated);
    }
    const db = readDB();
    const index = (db.qans || []).findIndex(q => q.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'اخطار یافت نشد' });
    db.qans[index].status = req.body.status;
    writeDB(db);
    res.json(db.qans[index]);
};