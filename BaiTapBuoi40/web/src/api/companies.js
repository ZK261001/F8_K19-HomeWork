import { apiFetch } from "./client";

const MAX_PAGES = 10;

export function listCompanies({ page = 1, keyword } = {}) {
    const params = new URLSearchParams();
    params.set("page", page);
    if (keyword) params.set("keyword", keyword);
    return apiFetch(`/companies?${params.toString()}`, { auth: false });
}

export function registerCompanyOwner(payload) {
    return apiFetch("/companies/register", { method: "POST", body: payload, auth: false });
}

// API không có endpoint chi tiết công ty, nên phải quét qua các trang công khai
// rồi tìm client-side.
async function findCompany(predicate) {
    let fetchedCount = 0;
    for (let page = 1; page <= MAX_PAGES; page++) {
        const { data, total } = await listCompanies({ page });
        const found = data.find(predicate);
        if (found) return found;
        fetchedCount += data.length;
        if (data.length === 0 || fetchedCount >= total) break;
    }
    return null;
}

// Dùng cho CompanyDetail.
export function findCompanyById(id) {
    return findCompany((company) => company.id === id);
}

// Token chỉ trả { id, email, role } — không có company_id. Cầu nối duy nhất
// giữa tài khoản nhà tuyển dụng và công ty là email, vì POST /companies/register
// dùng chung một email cho cả hai.
export function findCompanyByEmail(email) {
    const normalized = email?.trim().toLowerCase();
    if (!normalized) return Promise.resolve(null);
    return findCompany((company) => company.email?.trim().toLowerCase() === normalized);
}
