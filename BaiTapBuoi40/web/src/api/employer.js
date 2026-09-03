import { apiFetch } from "./client";

export function createJob(payload) {
    return apiFetch("/employer/jobs", { method: "POST", body: payload });
}
