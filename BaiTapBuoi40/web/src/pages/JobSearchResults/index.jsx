import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import SearchBar from "../../components/SearchBar";
import JobCard from "../../components/JobCard";
import Pagination from "../../components/Pagination";
import JobFilterSidebar from "./components/JobFilterSidebar";
import { normalizeSearchText } from "../../utils/text";
import styles from "./JobSearchResults.module.css";

const API_URL = "http://localhost:3000";
const PAGE_SIZE = 9;
const SALARY_OPTIONS = [
    { label: "5 triệu", value: 5000000 },
    { label: "10 triệu", value: 10000000 },
    { label: "15 triệu", value: 15000000 },
    { label: "20 triệu", value: 20000000 },
    { label: "25 triệu", value: 25000000 },
    { label: "30 triệu", value: 30000000 },
    { label: "50 triệu", value: 50000000 },
];

function JobSearchResults() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") ?? "";
    const locationId = searchParams.get("locationId") ?? "";

    const [jobs, setJobs] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        categoryId: "",
        industry: "",
        workType: "",
        experience: "",
        minSalary: "",
        hotOnly: false,
    });
    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const queryKey = `${keyword}|${locationId}|${filters.categoryId}|${filters.industry}|${filters.workType}|${filters.experience}|${filters.minSalary}|${filters.hotOnly}`;
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

    const activeJobs = useMemo(() => jobs.filter((job) => job.status === "active"), [jobs]);

    const industryOptions = useMemo(
        () =>
            [
                ...new Set(
                    activeJobs
                        .map((job) => companyById.get(String(job.companyId))?.field)
                        .filter(Boolean),
                ),
            ].sort((a, b) => a.localeCompare(b)),
        [activeJobs, companyById],
    );

    const workTypeOptions = useMemo(
        () => [...new Set(activeJobs.map((job) => job.workType).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
        [activeJobs],
    );

    const experienceOptions = useMemo(() => {
        const values = [...new Set(activeJobs.map((job) => job.experience).filter(Boolean))];
        const parseExperience = (value) => {
            const numbers = value.match(/\d+/g);
            if (!numbers) return [-1, -1];
            return numbers.length > 1
                ? [Number(numbers[0]), Number(numbers[1])]
                : [Number(numbers[0]), Number(numbers[0])];
        };
        return values.sort((a, b) => {
            const [aStart, aEnd] = parseExperience(a);
            const [bStart, bEnd] = parseExperience(b);
            return aStart - bStart || aEnd - bEnd;
        });
    }, [activeJobs]);

    const filteredJobs = useMemo(() => {
        return activeJobs.filter((job) => {
            const category = categoryById.get(String(job.categoryId));
            const titleMatches = normalizeSearchText(job.title).includes(normalizedKeyword);
            const categoryMatches = category
                ? normalizeSearchText(category.name).includes(normalizedKeyword)
                : false;
            if (!titleMatches && !categoryMatches) return false;

            if (locationId && String(job.locationId) !== locationId) return false;

            if (filters.categoryId && String(job.categoryId) !== filters.categoryId) return false;

            if (filters.industry) {
                const jobIndustry = companyById.get(String(job.companyId))?.field;
                if (jobIndustry !== filters.industry) return false;
            }

            if (filters.workType && job.workType !== filters.workType) return false;

            if (filters.experience && job.experience !== filters.experience) return false;

            if (filters.minSalary) {
                const threshold = Number(filters.minSalary);
                if (job.salaryMin == null || job.salaryMin < threshold) return false;
            }

            if (filters.hotOnly && !job.isHot) return false;

            return true;
        });
    }, [activeJobs, categoryById, companyById, normalizedKeyword, locationId, filters]);

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

            <div className={styles.layout}>
                <JobFilterSidebar
                    categoryOptions={categories}
                    industryOptions={industryOptions}
                    workTypeOptions={workTypeOptions}
                    experienceOptions={experienceOptions}
                    salaryOptions={SALARY_OPTIONS}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                />

                <div className={styles.content}>
                    <h1 className={styles.heading}>
                        {keyword
                            ? `Kết quả tìm kiếm cho "${keyword}" (${filteredJobs.length} việc làm)`
                            : `Tất cả công việc (${filteredJobs.length} việc làm)`}
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
            </div>
        </div>
    );
}

export default JobSearchResults;
