import { normalizeSearchText } from "./text";

export function filterJobsByKeyword(jobs, categories, keyword) {
    const normalizedKeyword = normalizeSearchText(keyword);

    return jobs
        .filter((job) => {
            const titleMatches = normalizeSearchText(job.title).includes(normalizedKeyword);
            const categoryMatches = normalizeSearchText(job.category).includes(normalizedKeyword);
            return titleMatches || categoryMatches;
        })
        .sort((a, b) => Number(b.is_hot) - Number(a.is_hot));
}

export function getPopularKeywords(categories, jobs, limit) {
    return categories
        .map((category) => ({
            keyword: category.name,
            count: jobs.filter((job) => job.category === category.name).length,
        }))
        .filter((entry) => entry.count > 0)
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
}

export function getTopJobs(jobs, limit) {
    return [...jobs].sort((a, b) => Number(b.is_hot) - Number(a.is_hot)).slice(0, limit);
}
