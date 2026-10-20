const { QAN, Defect } = require('../models');

exports.getQANs = async (req, res) => {
    try {
        const qans = await QAN.find().sort({ createdAt: -1 });
        res.json(qans);
    } catch (error) {
        res.status(500).json({ error: 'خطا در دریافت اخطارها' });
    }
};

exports.createQAN = async (req, res) => {
    try {
        const newQAN = new QAN(req.body);
        const saved = await newQAN.save();
        
        // تغییر وضعیت ایراد مرتبط
        if (req.body.defectCode) {
            await Defect.findOneAndUpdate(
                { defectCode: req.body.defectCode },
                { status: 'qan_issued' }
            );
        }

        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateQANStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, rejectReason } = req.body;

        const qan = await QAN.findOneAndUpdate(
            { qanId: id }, 
            { status, rejectReason }, 
            { new: true }
        );
        
        if (!qan) return res.status(404).json({ error: 'اخطار یافت نشد' });
        res.json(qan);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};