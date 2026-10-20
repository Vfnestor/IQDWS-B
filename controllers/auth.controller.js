const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ error: 'نام کاربری یا رمز عبور اشتباه است.' });
        
        // در نسخه نهایی باید از bcrypt.compare استفاده شود
        if (user.password !== password) return res.status(401).json({ error: 'نام کاربری یا رمز عبور اشتباه است.' });

        // ساخت توکن
        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role }, 
            process.env.JWT_SECRET || 'iqdws_ultra_secret_key_2026', 
            { expiresIn: '24h' }
        );

        res.json({ 
            message: 'ورود موفق', 
            token, 
            user: {
                username: user.username,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
                companyName: user.companyName,
                isFirstLogin: user.isFirstLogin
            } 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { username, newPassword } = req.body;
        
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ error: 'کاربر یافت نشد' });

        user.password = newPassword;
        user.isFirstLogin = false;
        await user.save();

        res.json({ message: 'رمز عبور با موفقیت تغییر کرد' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};