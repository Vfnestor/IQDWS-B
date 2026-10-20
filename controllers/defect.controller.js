const { Defect } = require('../models');

exports.getDefects = async (req, res) => {
    try {
        const defects = await Defect.find().sort({ createdAt: -1 });
        res.json(defects);
    } catch (error) {
        res.status(500).json({ error: 'خطا در دریافت ایرادها' });
    }
};

exports.createDefect = async (req, res) => {
    try {
        // داده‌ها مستقیماً از فرانت‌اند دریافت می‌شوند (شامل defectCode)
        const newDefect = new Defect(req.body);
        const saved = await newDefect.save();
        res.status(201).json(saved);
    } catch (error) {
        console.error("Error creating defect:", error);
        res.status(500).json({ error: 'خطای سرور در ثبت ایراد: ' + error.message });
    }
};