const { User, Defect, QAN } = require('../models');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.createUser = async (req, res) => {
    try {
        const existing = await User.findOne({ username: req.body.username });
        if (existing) return res.status(400).json({ error: 'Username already exists' });
        
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.getUserActivity = async (req, res) => {
    try {
        const defects = await Defect.find({ createdBy: req.params.username }).sort({ createdAt: -1 });
        const qans = await QAN.find({ createdBy: req.params.username }).sort({ createdAt: -1 });
        res.json({ defects, qans });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.updateUser = async (req, res) => {
    try {
        const updated = await User.findOneAndUpdate({ username: req.params.username }, req.body, { new: true });
        res.json(updated);
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findOneAndDelete({ username: req.params.username });
        res.json({ message: 'User deleted' });
    } catch (error) { res.status(500).json({ error: error.message }); }
};