const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api/v1";

const TOKEN_KEY = "authToken";

// Token sống 24h và API không có refresh token, nên hết hạn là mọi request đều
// 401. AuthContext đăng ký handler ở đây để app tự đăng xuất thay vì kẹt ở
// trạng thái "đã đăng nhập" đọc từ localStorage.
let onUnauthorized = null;

export function setUnauthorizedHandler(handler) {
    onUnauthorized = handler;
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
    if (token) {
        localStorage.setItem(TOKEN_KEY, token);
    } else {
        localStorage.removeItem(TOKEN_KEY);
    }
}

export async function apiFetch(path, { method = "GET", body, auth = true } = {}) {
    const headers = {};
    if (body !== undefined) {
        headers["Content-Type"] = "application/json";
    }

    const token = auth ? getToken() : null;
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE_URL}${path}`, {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    const data = res.status === 204 ? null : await res.json().catch(() => null);

    if (!res.ok) {
        // Chỉ đăng xuất khi request có gửi token — 401 của /auth/login là sai
        // mật khẩu, không phải phiên hết hạn.
        if (res.status === 401 && token) {
            setToken(null);
            onUnauthorized?.();
        }

        // Gắn status để tầng trên phân biệt được sai mật khẩu (401) với lỗi
        // mạng / API sập, thay vì gộp chung một thông báo.
        const error = new Error(data?.message || "Đã có lỗi xảy ra, vui lòng thử lại");
        error.status = res.status;
        throw error;
    }

    return data;
}
