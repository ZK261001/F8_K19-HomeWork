import { apiFetch } from "./client";

const MAX_PAGES = 10;

export function listJobs({ page = 1, keyword, categorySlug, cityId } = {}) {
    const params = new URLSearchParams();
    params.set("page", page);
    if (keyword) params.set("keyword", keyword);
    if (categorySlug) params.set("category_slug", categorySlug);
    if (cityId) params.set("city_id", cityId);
    return apiFetch(`/jobs?${params.toString()}`, { auth: false });
}

export function getJobBySlug(slug) {
    return apiFetch(`/jobs/${encodeURIComponent(slug)}`, { auth: false });
}

export function applyToJob(jobId, { cvId, coverLetter }) {
    return apiFetch(`/jobs/${jobId}/apply`, {
        method: "POST",
        body: { cv_id: cvId, cover_letter: coverLetter || null },
    });
}

// API không có endpoint lấy job theo company_id hay theo lô id, nên các màn cần
// những cách lọc đó phải quét qua các trang công khai rồi lọc client-side.
export async function fetchAllJobs() {
    const jobs = [];
    for (let page = 1; page <= MAX_PAGES; page++) {
        const { data, total } = await listJobs({ page });
        jobs.push(...data);
        if (data.length === 0 || jobs.length >= total) break;
    }
    return jobs;
}

// Dùng cho CompanyDetail.
export async function fetchAllJobsByCompanyId(companyId) {
    const jobs = await fetchAllJobs();
    return jobs.filter((job) => job.company.id === companyId);
}
