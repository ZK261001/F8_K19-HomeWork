import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import SearchBar from "../../components/SearchBar";
import JobCard from "../../components/JobCard";
import Pagination from "../../components/Pagination";
import JobFilterSidebar from "./components/JobFilterSidebar";
import { listJobs } from "../../api/jobs";
import { listCategoryGroups } from "../../api/categories";
import styles from "./JobSearchResults.module.css";

const PAGE_SIZE = 20;

function JobSearchResults() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") ?? "";
    const location = searchParams.get("location") ?? "";

    const [jobs, setJobs] = useState([]);
    const [total, setTotal] = useState(0);
    const [categoryGroups, setCategoryGroups] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({ categoryId: "", jobType: "", hotOnly: false });

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const categories = useMemo(
        () => categoryGroups.flatMap((group) => group.categories),
        [categoryGroups],
    );
    const selectedCategory = categories.find((c) => c.id === filters.categoryId);

    const locations = useMemo(() => {
        const seen = new Map();
        for (const job of jobs) {
            for (const loc of job.work_location ?? []) {
                if (loc.city_name && !seen.has(loc.city_name)) {
                    seen.set(loc.city_name, { id: loc.city_name, name: loc.city_name });
                }
            }
        }
        return [...seen.values()];
    }, [jobs]);

    const queryKey = `${keyword}|${location}|${filters.categoryId}|${filters.jobType}|${filters.hotOnly}`;
    const [prevQueryKey, setPrevQueryKey] = useState(queryKey);
    if (queryKey !== prevQueryKey) {
        setPrevQueryKey(queryKey);
        setCurrentPage(1);
    }

    useEffect(() => {
        listCategoryGroups().then(setCategoryGroups);
    }, []);

    useEffect(() => {
        listJobs({
            page: currentPage,
            keyword: keyword || undefined,
            categorySlug: selectedCategory?.slug,
        }).then(({ data, total: totalCount }) => {
            setJobs(data);
            setTotal(totalCount);
        });
        // selectedCategory được suy ra từ categoryGroups nên chỉ cần theo dõi id đã chọn
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, keyword, filters.categoryId, categoryGroups]);

    // API không có filter theo địa điểm/loại hình/is_hot ở query string, nên chỉ
    // lọc thêm trên trang dữ liệu hiện có (không đảm bảo đúng trên toàn bộ kết quả).
    const visibleJobs = useMemo(() => {
        return jobs.filter((job) => {
            if (location && !(job.work_location ?? []).some((loc) => loc.city_name === location)) {
                return false;
            }
            if (filters.jobType && job.job_type !== filters.jobType) return false;
            if (filters.hotOnly && !job.is_hot) return false;
            return true;
        });
    }, [jobs, location, filters.jobType, filters.hotOnly]);

    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    return (
        <div className={styles.page}>
            <div className={styles.searchBarWrapper}>
                <SearchBar locations={locations} categories={categories} jobs={jobs} />
            </div>

            <div className={styles.layout}>
                <JobFilterSidebar
                    categoryOptions={categories}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                />

                <div className={styles.content}>
                    <h1 className={styles.heading}>
                        {keyword
                            ? `Kết quả tìm kiếm cho "${keyword}" (${total} việc làm)`
                            : `Tất cả công việc (${total} việc làm)`}
                    </h1>

                    {visibleJobs.length > 0 ? (
                        <div className={styles.grid}>
                            {visibleJobs.map((job) => (
                                <JobCard key={job.id} job={job} />
                            ))}
                        </div>
                    ) : (
                        <p className={styles.empty}>Không tìm thấy việc làm phù hợp.</p>
                    )}

                    {total > 0 && (
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
