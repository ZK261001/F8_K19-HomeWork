import { apiFetch } from "./client";

export function createCv({ fullName, phone, email, summary, education, experience, skills }) {
    return apiFetch("/candidate/cvs", {
        method: "POST",
        body: {
            full_name: fullName || null,
            phone: phone || null,
            email: email || null,
            summary: summary || null,
            education: education || [],
            experience: experience || [],
            skills: skills || [],
        },
    });
}
