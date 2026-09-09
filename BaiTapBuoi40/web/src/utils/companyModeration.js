// API không có endpoint duyệt / từ chối công ty (chỉ trả `status` ở
// GET /companies), nên kết quả admin duyệt được lưu cục bộ trong trình duyệt
// và ghi đè lên `status` của API khi hiển thị.

const STORAGE_KEY = "companyModeration";

export function readModeration() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : {};
        // Chỉ nhận object thường — mảng hoặc null lọt vào sẽ làm hỏng chỗ tra
        // theo id ở dưới.
        return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
    } catch {
        return {};
    }
}

export function getEffectiveStatus(company) {
    if (!company) return null;
    return readModeration()[company.id] ?? company.status;
}

export function setCompanyStatus(companyId, status) {
    const next = { ...readModeration(), [companyId]: status };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
}
