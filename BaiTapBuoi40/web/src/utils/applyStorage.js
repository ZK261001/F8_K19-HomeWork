// API không có endpoint "CV của tôi" hay "đơn ứng tuyển của tôi", nên các
// thông tin này được lưu cục bộ trong trình duyệt theo từng user.

export function getStoredCvId(userId) {
    return localStorage.getItem(`cvId_${userId}`);
}

export function setStoredCvId(userId, cvId) {
    localStorage.setItem(`cvId_${userId}`, cvId);
}

function readAppliedJobs(userId) {
    try {
        const raw = localStorage.getItem(`appliedJobs_${userId}`);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function getAppliedJobs(userId) {
    return readAppliedJobs(userId);
}

export function getAppliedJob(userId, jobSlug) {
    return readAppliedJobs(userId).find((entry) => entry.jobSlug === jobSlug) ?? null;
}

export function addAppliedJob(userId, { jobSlug, jobTitle, companyName }) {
    const applied = readAppliedJobs(userId);
    const appliedAt = new Date().toISOString();
    const existing = applied.find((entry) => entry.jobSlug === jobSlug);

    if (existing) {
        // Ứng tuyển lại cùng một tin: giữ một dòng duy nhất nhưng cập nhật mốc
        // thời gian, để danh sách ở trang hồ sơ vẫn sắp đúng theo lần gần nhất.
        existing.appliedAt = appliedAt;
    } else {
        applied.push({ jobSlug, jobTitle, companyName, appliedAt });
    }

    localStorage.setItem(`appliedJobs_${userId}`, JSON.stringify(applied));
    return appliedAt;
}

// Những lần ứng tuyển sau chỉ dùng lại cvId, nên lưu thông tin CV lúc tạo để
// còn ghi được tên / email / SĐT ứng viên vào danh sách đơn bên dưới.
export function getStoredCvProfile(userId) {
    try {
        const raw = localStorage.getItem(`cvProfile_${userId}`);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function setStoredCvProfile(userId, profile) {
    localStorage.setItem(`cvProfile_${userId}`, JSON.stringify(profile));
}

// API không có endpoint để nhà tuyển dụng xem đơn ứng tuyển, nên mọi đơn được
// lưu chung một key (không theo user) để trang nhà tuyển dụng đọc lại được.
// Hạn chế: chỉ thấy những đơn nộp trên cùng trình duyệt.
const APPLICATIONS_KEY = "applications";

export function getAllApplications() {
    try {
        const raw = localStorage.getItem(APPLICATIONS_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function addApplication({ jobId, candidateId, fullName, email, phone, skills }) {
    const applications = getAllApplications();
    const appliedAt = new Date().toISOString();
    const existing = applications.find(
        (app) => app.jobId === jobId && app.candidateId === candidateId,
    );

    if (existing) {
        existing.appliedAt = appliedAt;
    } else {
        applications.push({ jobId, candidateId, fullName, email, phone, skills, appliedAt });
    }

    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
}
