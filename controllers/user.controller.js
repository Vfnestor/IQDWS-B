const { User, Defect, QAN } = require('../models');

// دریافت لیست کاربران با فیلتر
exports.getUsers = async (req, res) => {
    try {
        const { role, search } = req.query;
        let query = {};
        
        if (role) query.role = role;
        if (search) {
            query.$or = [
                { username: { $regex: search, $options: 'i' } },
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { companyName: { $regex: search, $options: 'i' } }
            ];
        }

        const users = await User.find(query).select('-password'); // عدم ارسال رمز
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ایجاد کاربر جدید
exports.createUser = async (req, res) => {
    try {
        const { username, password, role, firstName, lastName, companyName } = req.body;
        
        const existing = await User.findOne({ username });
        if (existing) return res.status(400).json({ error: 'نام کاربری تکراری است' });

        const newUser = new User({
            username, password, role, firstName, lastName, companyName,
            isFirstLogin: true // همیشه در اولین ساخت، اجبار به تغییر رمز
        });

        await newUser.save();
        res.status(201).json({ message: 'کاربر ایجاد شد', user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// دریافت عملکرد (Activity) یک کاربر خاص
exports.getUserActivity = async (req, res) => {
    try {
        const { username } = req.params;
        
        // گرفتن ایرادها و اخطارهایی که این کاربر ثبت کرده
        const defects = await Defect.find({ createdBy: username }).sort({ createdAt: -1 });
        const qans = await QAN.find({ createdBy: username }).sort({ createdAt: -1 });

        res.json({ defects, qans });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};