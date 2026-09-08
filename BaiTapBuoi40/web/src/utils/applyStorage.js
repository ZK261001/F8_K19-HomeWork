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
