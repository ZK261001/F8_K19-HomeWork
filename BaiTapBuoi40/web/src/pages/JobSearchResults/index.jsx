import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import SearchBar from "../../components/SearchBar";
import JobCard from "../../components/JobCard";
import Pagination from "../../components/Pagination";
import { normalizeSearchText } from "../../utils/text";
import styles from "./JobSearchResults.module.css";

const API_URL = "http://localhost:3000";
const PAGE_SIZE = 9;

function JobSearchResults() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") ?? "";
    const locationId = searchParams.get("locationId") ?? "";

    const [jobs, setJobs] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const queryKey = `${keyword}|${locationId}`;
    const [prevQueryKey, setPrevQueryKey] = useState(queryKey);
    if (queryKey !== prevQueryKey) {
        setPrevQueryKey(queryKey);
        setCurrentPage(1);
    }

    useEffect(() => {
        fetch(`${API_URL}/jobs`)
            .then((res) => res.json())
            .then(setJobs);

        fetch(`${API_URL}/companies`)
            .then((res) => res.json())
            .then(setCompanies);

        fetch(`${API_URL}/categories`)
            .then((res) => res.json())
            .then(setCategories);

        fetch(`${API_URL}/locations`)
            .then((res) => res.json())
            .then(setLocations);
    }, []);

    const companyById = useMemo(
        () => new Map(companies.map((c) => [String(c.id), c])),
        [companies],
    );
    const locationById = useMemo(
        () => new Map(locations.map((l) => [String(l.id), l])),
        [locations],
    );
    const categoryById = useMemo(
        () => new Map(categories.map((c) => [String(c.id), c])),
        [categories],
    );

    const normalizedKeyword = normalizeSearchText(keyword);

    const filteredJobs = useMemo(() => {
        return jobs.filter((job) => {
            if (job.status !== "active") return false;

            const category = categoryById.get(String(job.categoryId));
            const titleMatches = normalizeSearchText(job.title).includes(normalizedKeyword);
            const categoryMatches = category
                ? normalizeSearchText(category.name).includes(normalizedKeyword)
                : false;
            if (!titleMatches && !categoryMatches) return false;

            if (locationId && String(job.locationId) !== locationId) return false;
            return true;
        });
    }, [jobs, categoryById, normalizedKeyword, locationId]);

    const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));
    const start = (currentPage - 1) * PAGE_SIZE;
    const visibleJobs = filteredJobs.slice(start, start + PAGE_SIZE);

    return (
        <div className={styles.page}>
            <div className={styles.searchBarWrapper}>
                <SearchBar
                    locations={locations}
                    categories={categories}
                    jobs={jobs}
                    companies={companies}
                />
            </div>

            <h1 className={styles.heading}>
                Kết quả tìm kiếm cho "{keyword}" ({filteredJobs.length} việc làm)
            </h1>

            {visibleJobs.length > 0 ? (
                <div className={styles.grid}>
                    {visibleJobs.map((job) => (
                        <JobCard
                            key={job.id}
                            job={job}
                            company={companyById.get(String(job.companyId))}
                            location={locationById.get(String(job.locationId))}
                        />
                    ))}
                </div>
            ) : (
                <p className={styles.empty}>Không tìm thấy việc làm phù hợp.</p>
            )}

            {filteredJobs.length > 0 && (
                <div className={styles.paginationWrapper}>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        label="{current} / {total} trang"
                    />
                </div>
            )}
        </div>
    );
}

export default JobSearchResults;
