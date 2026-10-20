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
        const newDefect = new Defect(req.body);
        const saved = await newDefect.save();
        res.status(201).json(saved);
    } catch (error) {
        console.error("Error creating defect:", error);
        res.status(500).json({ error: 'خطای سرور در ثبت ایراد: ' + error.message });
    }
};

// تابعی که جا افتاده بود (برای جلوگیری از کرش سرور)
exports.updateDefect = async (req, res) => {
    try {
        const updated = await Defect.findOneAndUpdate(
            { defectCode: req.params.id }, // در فرانت‌اند آپدیت بر اساس defectCode انجام می‌شود
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ error: 'ایراد یافت نشد' });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};