const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
        return res.status(401).json({ error: 'دسترسی غیرمجاز. توکن ارسال نشده است.' });
    }

    try {
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
        const secretKey = process.env.JWT_SECRET || 'iqdws_ultra_secret_key_2026';
        
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ error: 'توکن نامعتبر یا منقضی شده است.' });
    }
};