const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'db.json');

if (!fs.existsSync(dbPath)) {
    const initialData = { 
        defects: [], 
        qans: [], 
        eightd: [],
        suppliers: [
            { id: 'SUP-001', name: 'قطعه‌سازی ایران‌خودرو', tier: 1, baseScore: 95 },
            { id: 'SUP-002', name: 'پلاستیک‌سازی البرز', tier: 1, baseScore: 92 },
            { id: 'SUP-003', name: 'الکترونیک پارس', tier: 2, baseScore: 90 }
        ],
        bugs: [
            { id: 'BUG-101', title: 'مشکل نمایش درست تاریخ در فایرفاکس', priority: 'medium', status: 'open', reportedBy: 'support', createdAt: new Date().toISOString() }
        ]
    };
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
}

const readDB = () => {
    return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
};

const writeDB = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

module.exports = { readDB, writeDB };