const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    firstName: String,
    lastName: String,
    companyName: String,
    isFirstLogin: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

const DefectSchema = new mongoose.Schema({
    defectCode: { type: String, required: true, unique: true },
    title: String, 
    vin: String, 
    severity: String, 
    qty: Number, 
    desc: String,
    imageBase64: String,
    status: { type: String, default: 'registered' },
    isDuplicate: { type: Boolean, default: false },
    createdBy: String, 
    createdByName: String, 
    createdAt: { type: Date, default: Date.now },
    lastUpdatedBy: String,
    lastUpdatedAt: { type: Date, default: Date.now },
    reviewSteps: [{
        date: String,
        desc: String,
        by: String
    }],
    slaReviewDate: Date,
    slaSupplierDate: Date,
    slaResolutionDate: Date,
    expertRejectCount: { type: Number, default: 0 },
    supplierRejectCount: { type: Number, default: 0 }
});

const QANSchema = new mongoose.Schema({
    qanId: { type: String, required: true, unique: true },
    defectCode: String, 
    title: String, 
    level: String,
    penalty: Number, 
    desc: String,
    status: { type: String, default: 'pending_dept' },
    createdBy: String, 
    createdByName: String,
    createdAt: { type: Date, default: Date.now }
});

const ClaimSchema = new mongoose.Schema({
    claimId: { type: String, required: true, unique: true },
    defectCode: String,
    partNo: String,
    partName: String,
    supplier: String,
    qty: Number,
    reason: String,
    vins: String,
    createdBy: String,
    createdAt: { type: Date, default: Date.now }
});

const AnalysisTaskSchema = new mongoose.Schema({
    taskId: { type: String, required: true, unique: true },
    defectCode: String,
    level: String,
    reason: String,
    status: { type: String, default: 'pending' },
    createdBy: String,
    createdByName: String,
    createdAt: { type: Date, default: Date.now },
    analystComment: String
});

const OperatorErrorSchema = new mongoose.Schema({
    errorId: { type: String, required: true, unique: true },
    operatorName: String,
    personnelId: String,
    location: String,
    shift: String,
    violation: String,
    severity: String,
    correctiveAction: String,
    date: String,
    createdBy: String
});

const NotificationSchema = new mongoose.Schema({
    notifId: { type: String, required: true, unique: true },
    targetUser: String,
    text: String,
    defectCode: String,
    isRead: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
});

const AuditLogSchema = new mongoose.Schema({
    action: String,
    target: String,
    details: String,
    user: String,
    date: { type: Date, default: Date.now }
});

module.exports = {
    User: mongoose.model('User', UserSchema),
    Defect: mongoose.model('Defect', DefectSchema),
    QAN: mongoose.model('QAN', QANSchema),
    Claim: mongoose.model('Claim', ClaimSchema),
    AnalysisTask: mongoose.model('AnalysisTask', AnalysisTaskSchema),
    OperatorError: mongoose.model('OperatorError', OperatorErrorSchema),
    Notification: mongoose.model('Notification', NotificationSchema),
    AuditLog: mongoose.model('AuditLog', AuditLogSchema)
};