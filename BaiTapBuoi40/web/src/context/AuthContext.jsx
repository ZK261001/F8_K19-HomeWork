import { createContext, useContext, useEffect, useState } from "react";

import * as authApi from "../api/auth";
import { setToken } from "../api/client";

const STORAGE_KEY = "authUser";
const AuthContext = createContext(null);

function readStoredUser() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(readStoredUser);

    useEffect(() => {
        if (user) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, [user]);

    function persistSession({ access_token, user: authUser }) {
        setToken(access_token);
        setUser(authUser);
        return authUser;
    }

    async function login(email, password) {
        try {
            const result = await authApi.login(email, password);
            return persistSession(result);
        } catch {
            throw new Error("Email hoặc mật khẩu không đúng");
        }
    }

    async function register({ role = "candidate", fullName, email, password, company }) {
        if (role === "recruiter") {
            await authApi.registerCompany({
                taxCode: company.mst,
                companyName: company.name,
                internationalName: company.internationalName,
                director: company.director,
                phoneNumber: company.phone,
                email,
                password,
            });
            // POST /companies/register không trả token, nên đăng nhập lại
            // ngay để giữ trải nghiệm "đăng ký xong tự vào" như trước.
            return login(email, password);
        }

        const result = await authApi.registerCandidate({ email, password, fullName });
        return persistSession(result);
    }

    async function logout() {
        try {
            await authApi.logout();
        } catch {
            // stateless JWT — logout phía server chỉ mang tính hình thức
        }
        setToken(null);
        setUser(null);
    }

    const value = { user, isAuthenticated: Boolean(user), login, register, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
