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

export function hasAppliedToJob(userId, jobSlug) {
    return readAppliedJobs(userId).some((entry) => entry.jobSlug === jobSlug);
}

export function addAppliedJob(userId, { jobSlug, jobTitle, companyName }) {
    const applied = readAppliedJobs(userId);
    if (applied.some((entry) => entry.jobSlug === jobSlug)) return;
    applied.push({ jobSlug, jobTitle, companyName, appliedAt: new Date().toISOString() });
    localStorage.setItem(`appliedJobs_${userId}`, JSON.stringify(applied));
}
