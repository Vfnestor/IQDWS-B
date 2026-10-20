const mongoose = require('mongoose');

const DefectSchema = new mongoose.Schema({
    title: String, vin: String, severity: String, qty: Number, desc: String,
    imageBase64: String, // فیلد جدید برای ذخیره عکس فشرده‌شده
    status: { type: String, default: 'registered' }, qanId: String,
    createdBy: String, createdAt: { type: Date, default: Date.now }
});

const QANSchema = new mongoose.Schema({
    defectId: String, supplierId: String, title: String, level: String,
    penalty: Number, status: { type: String, default: 'pending_dept' },
    createdBy: String, createdAt: { type: Date, default: Date.now }
});

const EightDSchema = new mongoose.Schema({
    qanId: String, d1_team: String, d2_problem: String, d3_containment: String,
    d4_root_cause: String, d5_capa: String, d6_implementation: String,
    d7_prevention: String, d8_lesson: String,
    createdBy: String, createdAt: { type: Date, default: Date.now }
});

const BugSchema = new mongoose.Schema({
    title: String, priority: String, status: { type: String, default: 'open' },
    reportedBy: String, createdAt: { type: Date, default: Date.now }
});

module.exports = {
    Defect: mongoose.model('Defect', DefectSchema),
    QAN: mongoose.model('QAN', QANSchema),
    EightD: mongoose.model('EightD', EightDSchema),
    Bug: mongoose.model('Bug', BugSchema)
};