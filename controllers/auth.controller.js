const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const { role, app } = req.body;
    
    if (!role || !app) {
        return res.status(400).json({ error: 'نقش و سامانه الزامی است.' });
    }

    // اگر متغیر محیطی در رندر تنظیم نشده بود، از این کلید پیش‌فرض استفاده می‌کند
    const secretKey = process.env.JWT_SECRET || 'iqdws_ultra_secret_key_2026';

    const token = jwt.sign(
        { role, app }, 
        secretKey, 
        { expiresIn: '24h' }
    );

    res.json({ 
        message: 'ورود موفقیت‌آمیز بود', 
        token,
        user: { role, app }
    });
};