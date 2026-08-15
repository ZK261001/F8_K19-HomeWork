export function formatDate(isoDate) {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) return isoDate;
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    return `${dd}/${mm}/${date.getFullYear()}`;
}

export function daysUntil(isoDate) {
    if (!isoDate) return null;
    const target = new Date(isoDate);
    if (Number.isNaN(target.getTime())) return null;
    target.setHours(23, 59, 59, 999);
    const diffMs = target.getTime() - Date.now();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}
