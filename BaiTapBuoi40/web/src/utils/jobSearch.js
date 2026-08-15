import { normalizeSearchText } from "./text";

export function filterJobsByKeyword(jobs, categories, keyword) {
    const normalizedKeyword = normalizeSearchText(keyword);
    const categoryById = new Map(categories.map((c) => [String(c.id), c]));

    return jobs
        .filter((job) => job.status === "active")
        .filter((job) => {
            const category = categoryById.get(String(job.categoryId));
            const titleMatches = normalizeSearchText(job.title).includes(normalizedKeyword);
            const categoryMatches = category
                ? normalizeSearchText(category.name).includes(normalizedKeyword)
                : false;
            return titleMatches || categoryMatches;
        })
        .sort((a, b) => b.viewCount - a.viewCount);
}

export function getPopularKeywords(categories, jobs, limit) {
    return categories
        .map((category) => ({
            keyword: category.name,
            count: jobs.filter(
                (job) => job.status === "active" && String(job.categoryId) === String(category.id),
            ).length,
        }))
        .filter((entry) => entry.count > 0)
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
}

export function getTopJobs(jobs, limit) {
    return jobs
        .filter((job) => job.status === "active")
        .sort((a, b) => b.viewCount - a.viewCount)
        .slice(0, limit);
}
