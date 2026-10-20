const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
        return res.status(401).json({ error: 'دسترسی غیرمجاز. توکن ارسال نشده است.' });
    }

    try {
        // اصلاح باگ: استخراج صحیح توکن بدون حساسیت به حروف بزرگ و کوچک کلمه Bearer
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ error: 'توکن نامعتبر یا منقضی شده است.' });
    }
};