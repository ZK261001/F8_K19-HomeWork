// Các lựa chọn dùng chung cho bộ lọc ở màn việc làm và form đăng tuyển.
// Nhãn hiển thị nằm ở utils/format.js (jobTypeLabel / genderLabel), ở đây chỉ
// giữ danh sách giá trị đúng theo enum của API.

export const JOB_TYPES = ["FULL_TIME", "PART_TIME", "FREELANCE", "INTERNSHIP"];

export const GENDERS = ["NOT_REQUIRED", "MALE", "FEMALE"];

const MILLION = 1_000_000;

// `min`/`max` là khoảng lương (VNĐ) mà mục lọc đại diện; `null` nghĩa là không
// chặn đầu đó. NEGOTIABLE không có số nên xử lý riêng trong matchesSalaryRange.
export const SALARY_RANGES = [
    { key: "UNDER_10", label: "Dưới 10 triệu", min: null, max: 10 * MILLION },
    { key: "10_15", label: "10 - 15 triệu", min: 10 * MILLION, max: 15 * MILLION },
    { key: "15_20", label: "15 - 20 triệu", min: 15 * MILLION, max: 20 * MILLION },
    { key: "20_30", label: "20 - 30 triệu", min: 20 * MILLION, max: 30 * MILLION },
    { key: "OVER_30", label: "Trên 30 triệu", min: 30 * MILLION, max: null },
    { key: "NEGOTIABLE", label: "Thoả thuận", min: null, max: null },
];

export function salaryRangeLabel(rangeKey) {
    return SALARY_RANGES.find((range) => range.key === rangeKey)?.label ?? rangeKey;
}

export function matchesSalaryRange(salary, rangeKey) {
    if (!rangeKey) return true;

    const hasNoNumber = !salary || (salary.min == null && salary.max == null);
    if (rangeKey === "NEGOTIABLE") {
        return Boolean(salary?.is_negotiable) || hasNoNumber;
    }

    // Tin "thoả thuận" không có con số nào để so, nên không thuộc khoảng nào cả.
    if (hasNoNumber) return false;

    const range = SALARY_RANGES.find((item) => item.key === rangeKey);
    if (!range) return true;

    // Khớp khi khoảng lương của tin giao với khoảng của bộ lọc — tin 15-25 triệu
    // phải hiện ra ở cả "15 - 20 triệu" lẫn "20 - 30 triệu".
    const jobMin = salary.min ?? 0;
    const jobMax = salary.max ?? Infinity;
    const filterMin = range.min ?? 0;
    const filterMax = range.max ?? Infinity;

    return jobMin < filterMax && jobMax > filterMin;
}

export const SORT_OPTIONS = [
    { key: "DEFAULT", label: "Mặc định" },
    { key: "SALARY_DESC", label: "Lương cao nhất" },
    { key: "DEADLINE_ASC", label: "Hạn nộp gần nhất" },
];

// API không trả ngày đăng tin nên không có lựa chọn "Mới nhất". Mặc định đưa
// tin nổi bật lên đầu, giống cách sắp xếp ở utils/jobSearch.js.
function hotFirst(a, b) {
    return Number(b.is_hot) - Number(a.is_hot);
}

function salaryScore(job) {
    return job.salary?.max ?? job.salary?.min ?? -1;
}

export function sortJobs(jobs, sortKey) {
    const sorted = [...jobs];

    if (sortKey === "SALARY_DESC") {
        return sorted.sort((a, b) => salaryScore(b) - salaryScore(a) || hotFirst(a, b));
    }

    if (sortKey === "DEADLINE_ASC") {
        return sorted.sort((a, b) => {
            // Tin không có hạn nộp thì đẩy xuống cuối thay vì tạo NaN khi so sánh.
            const aTime = a.deadline ? new Date(a.deadline).getTime() : Infinity;
            const bTime = b.deadline ? new Date(b.deadline).getTime() : Infinity;
            return aTime - bTime || hotFirst(a, b);
        });
    }

    return sorted.sort(hotFirst);
}
