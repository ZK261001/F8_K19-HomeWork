const currencyFormatter = new Intl.NumberFormat("vi-VN");

function formatAmount(amount, currency) {
    if (currency && currency !== "VND") {
        return `${currencyFormatter.format(amount)} ${currency}`;
    }
    return `${currencyFormatter.format(amount)} đ`;
}

export function formatSalary(salary) {
    if (!salary || salary.is_negotiable || salary.type === "AGREEMENT") {
        return "Thoả thuận";
    }

    const { type, min, max, currency } = salary;
    if (type === "RANGE" && min != null && max != null) {
        return `${formatAmount(min, currency)} - ${formatAmount(max, currency)}`;
    }
    if (type === "UP_TO" && max != null) {
        return `Tới ${formatAmount(max, currency)}`;
    }
    if (type === "MINIMUM" && min != null) {
        return `Từ ${formatAmount(min, currency)}`;
    }
    return "Thoả thuận";
}

export function formatWorkLocation(workLocation) {
    if (!workLocation || workLocation.length === 0) return "Chưa cập nhật";
    const names = workLocation.map((loc) => loc.city_name).filter(Boolean);
    if (names.length === 0) return "Chưa cập nhật";
    if (names.length === 1) return names[0];
    return `${names[0]} +${names.length - 1}`;
}

const JOB_TYPE_LABELS = {
    FULL_TIME: "Toàn thời gian",
    PART_TIME: "Bán thời gian",
    FREELANCE: "Freelance",
    INTERNSHIP: "Thực tập",
};

export function jobTypeLabel(jobType) {
    return JOB_TYPE_LABELS[jobType] ?? jobType;
}

const GENDER_LABELS = {
    MALE: "Nam",
    FEMALE: "Nữ",
    NOT_REQUIRED: "Không yêu cầu",
};

export function genderLabel(gender) {
    return GENDER_LABELS[gender] ?? "Không yêu cầu";
}

const COMPANY_STATUS_LABELS = {
    PENDING: "Đang chờ duyệt",
    APPROVED: "Đã xác thực",
    REJECTED: "Bị từ chối",
};

export function companyStatusLabel(status) {
    return COMPANY_STATUS_LABELS[status] ?? status;
}

const ROLE_LABELS = {
    CANDIDATE: "Ứng viên",
    EMPLOYER: "Nhà tuyển dụng",
    ADMIN: "Quản trị viên",
};

export function roleLabel(role) {
    return ROLE_LABELS[role] ?? role;
}
