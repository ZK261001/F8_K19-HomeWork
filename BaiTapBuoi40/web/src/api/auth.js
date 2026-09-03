import { apiFetch } from "./client";

export function login(email, password) {
    return apiFetch("/auth/login", { method: "POST", body: { email, password }, auth: false });
}

export function registerCandidate({ email, password, fullName }) {
    return apiFetch("/auth/register", {
        method: "POST",
        body: { email, password, full_name: fullName },
        auth: false,
    });
}

export function registerCompany({
    taxCode,
    companyName,
    internationalName,
    director,
    phoneNumber,
    email,
    password,
}) {
    return apiFetch("/companies/register", {
        method: "POST",
        body: {
            tax_code: taxCode,
            company_name: companyName,
            international_name: internationalName || null,
            director: director || null,
            phone_number: phoneNumber,
            email,
            password,
        },
        auth: false,
    });
}

export function logout() {
    return apiFetch("/auth/logout", { method: "POST" });
}
