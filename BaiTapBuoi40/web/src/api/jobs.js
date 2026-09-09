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

// API chỉ lọc được theo keyword / category_slug / city_id, nên các màn cần lọc
// theo tiêu chí khác phải quét hết các trang rồi lọc client-side. `filters` là
// những tham số mà server làm được, truyền thẳng xuống listJobs.
export async function fetchAllJobs(filters = {}) {
    const jobs = [];
    for (let page = 1; page <= MAX_PAGES; page++) {
        const { data, total } = await listJobs({ page, ...filters });
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
