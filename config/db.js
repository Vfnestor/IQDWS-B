const fs = require('fs');
const path = require('path');

// مسیر فایل دیتابیس موقت (JSON) در ریشه
const dbPath = path.join(__dirname, '..', 'db.json');

// اگر فایل دیتابیس وجود نداشت، بساز
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ defects: [], qans: [], eightd: [] }, null, 2));
}

const readDB = () => {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
};

const writeDB = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

module.exports = { readDB, writeDB };