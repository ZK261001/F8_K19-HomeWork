import { createContext, useContext, useEffect, useState } from "react";

const API_URL = "http://localhost:3000";
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

    async function login(email, password) {
        const params = new URLSearchParams({ email, password });
        const res = await fetch(`${API_URL}/users?${params.toString()}`);
        const matches = await res.json();
        if (matches.length === 0) {
            throw new Error("Email hoặc mật khẩu không đúng");
        }
        setUser(matches[0]);
        return matches[0];
    }

    async function register({ role = "candidate", fullName, email, phone, password, company }) {
        const existingRes = await fetch(`${API_URL}/users?email=${encodeURIComponent(email)}`);
        const existing = await existingRes.json();
        if (existing.length > 0) {
            throw new Error("Email này đã được đăng ký");
        }

        let companyId = null;
        if (role === "recruiter") {
            const companyRes = await fetch(`${API_URL}/companies`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    mst: company.mst,
                    name: company.name,
                    internationalName: company.internationalName || "",
                    director: company.director,
                    phone: company.phone,
                    email: company.email,
                    logo: "",
                    coverImage: "",
                    address: "",
                    scale: "",
                    field: "",
                    description: "",
                    website: "",
                    foundedYear: null,
                    status: "pending",
                    createdAt: new Date().toISOString(),
                }),
            });
            const newCompany = await companyRes.json();
            companyId = newCompany.id;
        }

        const res = await fetch(`${API_URL}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                role,
                fullName,
                email,
                phone: phone || "",
                password,
                avatar: "",
                companyId,
                createdAt: new Date().toISOString(),
            }),
        });
        const newUser = await res.json();
        setUser(newUser);
        return newUser;
    }

    function logout() {
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
