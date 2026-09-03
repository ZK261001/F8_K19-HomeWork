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

// API không có endpoint chi tiết công ty theo id, nên phải quét qua các
// trang công khai rồi tìm client-side. Dùng cho CompanyDetail.
export async function findCompanyById(id) {
    let fetchedCount = 0;
    for (let page = 1; page <= MAX_PAGES; page++) {
        const { data, total } = await listCompanies({ page });
        const found = data.find((company) => company.id === id);
        if (found) return found;
        fetchedCount += data.length;
        if (data.length === 0 || fetchedCount >= total) break;
    }
    return null;
}
