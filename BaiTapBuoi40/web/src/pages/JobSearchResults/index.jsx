import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import SearchBar from "../../components/SearchBar";
import JobCard from "../../components/JobCard";
import Pagination from "../../components/Pagination";
import JobFilterSidebar from "./components/JobFilterSidebar";
import { listJobs } from "../../api/jobs";
import { listCategoryGroups } from "../../api/categories";
import { CITIES, findCityById } from "../../constants/cities";
import styles from "./JobSearchResults.module.css";

const PAGE_SIZE = 20;

function JobSearchResults() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") ?? "";
    const cityId = searchParams.get("city") ?? "";

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
    const selectedCity = findCityById(cityId);

    const queryKey = `${keyword}|${cityId}|${filters.categoryId}|${filters.jobType}|${filters.hotOnly}`;
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
            cityId: cityId || undefined,
        }).then(({ data, total: totalCount }) => {
            setJobs(data);
            setTotal(totalCount);
        });
        // selectedCategory được suy ra từ categoryGroups nên chỉ cần theo dõi id đã chọn
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, keyword, cityId, filters.categoryId, categoryGroups]);

    // keyword / category_slug / city_id đã lọc ở server. Còn job_type và is_hot
    // thì API không có tham số nào, đành lọc trên trang dữ liệu hiện tại.
    const isLocalFilterActive = Boolean(filters.jobType) || filters.hotOnly;

    const visibleJobs = useMemo(() => {
        if (!isLocalFilterActive) return jobs;
        return jobs.filter((job) => {
            if (filters.jobType && job.job_type !== filters.jobType) return false;
            if (filters.hotOnly && !job.is_hot) return false;
            return true;
        });
    }, [jobs, isLocalFilterActive, filters.jobType, filters.hotOnly]);

    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    const headingSuffix = selectedCity ? ` tại ${selectedCity.name}` : "";
    const heading = keyword
        ? `Kết quả tìm kiếm cho "${keyword}"${headingSuffix} (${total} việc làm)`
        : `Tất cả công việc${headingSuffix} (${total} việc làm)`;

    return (
        <div className={styles.page}>
            <div className={styles.searchBarWrapper}>
                <SearchBar
                    locations={CITIES}
                    categories={categories}
                    jobs={jobs}
                    initialCityId={cityId}
                />
            </div>

            <div className={styles.layout}>
                <JobFilterSidebar
                    categoryOptions={categories}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                />

                <div className={styles.content}>
                    <h1 className={styles.heading}>{heading}</h1>

                    {isLocalFilterActive && (
                        <p className={styles.filterNote}>
                            Đang lọc hình thức làm việc / tin nổi bật trong trang hiện tại:{" "}
                            {visibleJobs.length}/{jobs.length} việc làm.
                        </p>
                    )}

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
