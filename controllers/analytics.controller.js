const { readDB } = require('../config/db');

exports.getSuppliers = (req, res) => {
    const db = readDB();
    
    // لیست پایه سازندگان (در دیتابیس واقعی این اطلاعات از جدول Suppliers خوانده می‌شود)
    let suppliers = db.suppliers || [
        { id: 'SUP-001', name: 'قطعه‌سازی ایران‌خودرو', tier: 1, baseScore: 95 },
        { id: 'SUP-002', name: 'پلاستیک‌سازی البرز', tier: 1, baseScore: 92 },
        { id: 'SUP-003', name: 'الکترونیک پارس', tier: 2, baseScore: 90 }
    ];

    const qans = db.qans || [];
    
    // محاسبه نمره پویا بر اساس اخطارها (شبیه‌سازی فرمول نمره‌دهی)
    suppliers = suppliers.map(sup => {
        // فعلاً برای سادگی، اخطارها را به سازنده اول نسبت می‌دهیم
        // در نسخه نهایی، کلید خارجی supplierId در QAN وجود خواهد داشت
        let penaltyScore = 0;
        qans.forEach(q => {
            if (q.status !== 'closed') {
                if (q.level === 'L3') penaltyScore += 15;
                else if (q.level === 'L2') penaltyScore += 8;
                else penaltyScore += 3;
            }
        });

        const finalScore = Math.max(0, sup.baseScore - (sup.id === 'SUP-001' ? penaltyScore : 0));
        
        return { 
            ...sup, 
            score: finalScore,
            tier: finalScore >= 90 ? 'A' : finalScore >= 75 ? 'B' : finalScore >= 60 ? 'C' : 'D'
        };
    });

    res.json(suppliers);
};

exports.getDashboardStats = (req, res) => {
    const db = readDB();
    const defects = db.defects || [];
    const qans = db.qans || [];
    
    res.json({
        totalDefects: defects.length,
        openQANs: qans.filter(q => q.status !== 'closed').length,
        criticalDefects: defects.filter(d => d.severity === 'critical').length,
        systemHealth: '99.9%'
    });
};