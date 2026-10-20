const mongoose = require('mongoose');

// مدل کاربران (شامل کارمندان و سازندگان)
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // کد پرسنلی یا نام شرکت
    password: { type: String, required: true }, // در نسخه نهایی باید هش شود (bcrypt)
    role: { type: String, required: true }, // sys_admin, inspector, expert, supplier, ...
    firstName: String,
    lastName: String,
    companyName: String, // فقط برای سازندگان
    isFirstLogin: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

// مدل ایرادها
const DefectSchema = new mongoose.Schema({
    defectCode: { type: String, required: true, unique: true }, // کد یکتا مثل CMC000001
    title: String, 
    vin: String, 
    severity: String, 
    qty: Number, 
    desc: String,
    imageBase64: String,
    status: { type: String, default: 'registered' }, 
    createdBy: String, // نام کاربری ثبت‌کننده
    createdByName: String, // نام نمایشی ثبت‌کننده
    createdAt: { type: Date, default: Date.now }
});

// مدل اخطارهای کیفی
const QANSchema = new mongoose.Schema({
    qanId: { type: String, required: true, unique: true },
    defectCode: String, 
    title: String, 
    level: String,
    penalty: Number, 
    status: { type: String, default: 'pending_dept' }, // pending_dept, pending_office, approved, rejected
    rejectReason: String,
    createdBy: String, 
    createdByName: String,
    createdAt: { type: Date, default: Date.now }
});

// مدل باگ‌ها (پشتیبانی)
const BugSchema = new mongoose.Schema({
    title: String, priority: String, status: { type: String, default: 'open' },
    reportedBy: String, createdAt: { type: Date, default: Date.now }
});

module.exports = {
    User: mongoose.model('User', UserSchema),
    Defect: mongoose.model('Defect', DefectSchema),
    QAN: mongoose.model('QAN', QANSchema),
    Bug: mongoose.model('Bug', BugSchema)
};