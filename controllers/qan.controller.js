const { QAN } = require('../models');

exports.getQANs = async (req, res) => {
    try {
        const qans = await QAN.find().sort({ createdAt: -1 });
        res.json(qans);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.createQAN = async (req, res) => {
    try {
        const newQAN = new QAN(req.body);
        await newQAN.save();
        res.status(201).json(newQAN);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.updateQANStatus = async (req, res) => {
    try {
        const qan = await QAN.findOneAndUpdate(
            { qanId: req.params.id }, 
            { status: req.body.status }, 
            { new: true }
        );
        if (!qan) return res.status(404).json({ error: 'QAN not found' });
        res.json(qan);
    } catch (error) { res.status(500).json({ error: error.message }); }
};