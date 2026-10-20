const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const { role, app } = req.body;
    
    if (!role || !app) {
        return res.status(400).json({ error: 'نقش و سامانه الزامی است.' });
    }

    const token = jwt.sign(
        { role, app }, 
        process.env.JWT_SECRET, 
        { expiresIn: '24h' }
    );

    res.json({ 
        message: 'ورود موفقیت‌آمیز بود', 
        token,
        user: { role, app }
    });
};