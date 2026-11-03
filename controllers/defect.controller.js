const { Defect } = require('../models');

exports.getDefects = async (req, res) => {
    try {
        const defects = await Defect.find().sort({ createdAt: -1 });
        res.json(defects);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.createDefect = async (req, res) => {
    try {
        const newDefect = new Defect(req.body);
        await newDefect.save();
        res.status(201).json(newDefect);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.updateDefect = async (req, res) => {
    try {
        const updated = await Defect.findOneAndUpdate(
            { defectCode: req.params.code }, 
            req.body, 
            { new: true }
        );
        if (!updated) return res.status(404).json({ error: 'Defect not found' });
        res.json(updated);
    } catch (error) { res.status(500).json({ error: error.message }); }
};