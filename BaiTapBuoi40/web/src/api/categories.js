import { apiFetch } from "./client";

export function listCategoryGroups() {
    return apiFetch("/categories", { auth: false });
}
