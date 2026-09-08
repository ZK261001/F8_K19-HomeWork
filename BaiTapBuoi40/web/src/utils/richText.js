const TAG_PATTERN = /<[^>]*>/g;
const NON_BREAKING_SPACE = " ";

// Vùng contentEditable rỗng vẫn để lại "<br>" hoặc "<p></p>", nên kiểm tra bắt
// buộc không thể dựa vào value.trim(). Đây là bản chiếu của has_visible_text
// trong backend/utils/sanitize.py.
export function hasVisibleText(html) {
    if (!html) return false;
    const text = html.replace(TAG_PATTERN, "").replaceAll("&nbsp;", " ");
    return text.replaceAll(NON_BREAKING_SPACE, " ").trim().length > 0;
}
