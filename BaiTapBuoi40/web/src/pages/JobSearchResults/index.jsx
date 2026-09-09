import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import SearchBar from "../../components/SearchBar";
import JobCard from "../../components/JobCard";
import FilterChip from "../../components/FilterChip";
import Pagination from "../../components/Pagination";
import JobFilterSidebar from "./components/JobFilterSidebar";
import { fetchAllJobs } from "../../api/jobs";
import { listCategoryGroups } from "../../api/categories";
import { CITIES, findCityById } from "../../constants/cities";
import { SORT_OPTIONS, matchesSalaryRange, salaryRangeLabel, sortJobs } from "../../constants/jobFilters";
import { genderLabel, jobTypeLabel } from "../../utils/format";
import styles from "./JobSearchResults.module.css";

const PAGE_SIZE = 20;

function JobSearchResults() {
    // Mọi bộ lọc nằm trong URL để chia sẻ link được, F5 và nút Back đều đúng.
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") ?? "";
    const cityId = searchParams.get("city") ?? "";
    const categoryId = searchParams.get("category") ?? "";
    const jobType = searchParams.get("job_type") ?? "";
    const salaryRange = searchParams.get("salary") ?? "";
    const experience = searchParams.get("exp") ?? "";
    const gender = searchParams.get("gender") ?? "";
    const hotOnly = searchParams.get("hot") === "1";
    const sortKey = searchParams.get("sort") ?? "DEFAULT";
    const currentPage = Number(searchParams.get("page")) || 1;

    const [jobs, setJobs] = useState([]);
    const [categoryGroups, setCategoryGroups] = useState([]);

    const filters = { categoryId, cityId, jobType, salaryRange, experience, gender, hotOnly };

    function updateParams(changes) {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            for (const [key, value] of Object.entries(changes)) {
                if (value) {
                    next.set(key, value);
                } else {
                    next.delete(key);
                }
            }
            return next;
        });
    }

    // Đổi bộ lọc thì quay về trang 1, nếu không sẽ rơi vào trang trống.
    function handleFilterChange(key, value) {
        updateParams({ [key]: value, page: "" });
    }

    function clearFilters() {
        // Giữ lại keyword: người dùng xoá bộ lọc chứ không huỷ luôn từ khoá vừa tìm.
        setSearchParams(keyword ? { keyword } : {});
    }

    const categories = useMemo(
        () => categoryGroups.flatMap((group) => group.categories),
        [categoryGroups],
    );
    const selectedCategory = categories.find((c) => c.id === categoryId);
    const selectedCity = findCityById(cityId);

    useEffect(() => {
        listCategoryGroups().then(setCategoryGroups);
    }, []);

    // keyword / category_slug / city_id lọc được ở server; các tiêu chí còn lại
    // API không hỗ trợ nên phải lấy đủ mọi trang rồi lọc client-side — có vậy số
    // việc làm hiển thị mới khớp với phân trang.
    useEffect(() => {
        let cancelled = false;

        fetchAllJobs({
            keyword: keyword || undefined,
            categorySlug: selectedCategory?.slug,
            cityId: cityId || undefined,
        })
            .then((data) => {
                if (!cancelled) setJobs(data);
            })
            .catch(() => {
                if (!cancelled) setJobs([]);
            });

        return () => {
            cancelled = true;
        };
        // selectedCategory được suy ra từ categoryGroups nên chỉ cần theo dõi id đã chọn
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword, cityId, categoryId, categoryGroups]);

    // Kinh nghiệm là chuỗi tự do, danh sách lựa chọn lấy từ chính dữ liệu trả về.
    const experienceOptions = useMemo(
        () =>
            [...new Set(jobs.map((job) => job.experience_level).filter(Boolean))].sort((a, b) =>
                a.localeCompare(b, "vi"),
            ),
        [jobs],
    );

    const matchedJobs = useMemo(() => {
        const filtered = jobs.filter((job) => {
            if (jobType && job.job_type !== jobType) return false;
            if (gender && job.gender !== gender) return false;
            if (experience && job.experience_level !== experience) return false;
            if (salaryRange && !matchesSalaryRange(job.salary, salaryRange)) return false;
            if (hotOnly && !job.is_hot) return false;
            return true;
        });
        return sortJobs(filtered, sortKey);
    }, [jobs, jobType, gender, experience, salaryRange, hotOnly, sortKey]);

    const total = matchedJobs.length;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    // Vào thẳng URL có ?page vượt quá số trang thì kẹp lại thay vì hiện lưới rỗng.
    const safePage = Math.min(Math.max(currentPage, 1), totalPages);
    const visibleJobs = matchedJobs.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

    const activeChips = [
        selectedCategory && { key: "category", label: selectedCategory.name },
        selectedCity && { key: "city", label: selectedCity.name },
        salaryRange && { key: "salary", label: salaryRangeLabel(salaryRange) },
        jobType && { key: "job_type", label: jobTypeLabel(jobType) },
        experience && { key: "exp", label: experience },
        gender && { key: "gender", label: genderLabel(gender) },
        hotOnly && { key: "hot", label: "Tin nổi bật" },
    ].filter(Boolean);

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
                    initialKeyword={keyword}
                    initialCityId={cityId}
                />
            </div>

            <div className={styles.layout}>
                <JobFilterSidebar
                    categoryGroups={categoryGroups}
                    experienceOptions={experienceOptions}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                />

                <div className={styles.content}>
                    <h1 className={styles.heading}>{heading}</h1>

                    <div className={styles.toolbar}>
                        <div className={styles.chipRow}>
                            {activeChips.map((chip) => (
                                <FilterChip
                                    key={chip.key}
                                    label={chip.label}
                                    active
                                    onRemove={() => handleFilterChange(chip.key, "")}
                                />
                            ))}
                            {activeChips.length > 0 && (
                                <button
                                    type="button"
                                    className={styles.clearButton}
                                    onClick={clearFilters}
                                >
                                    Xoá bộ lọc
                                </button>
                            )}
                        </div>

                        <label className={styles.sortRow}>
                            <span className={styles.sortLabel}>Sắp xếp:</span>
                            <select
                                className={styles.sortSelect}
                                value={sortKey}
                                onChange={(e) => handleFilterChange("sort", e.target.value)}
                            >
                                {SORT_OPTIONS.map((option) => (
                                    <option key={option.key} value={option.key}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

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
                                currentPage={safePage}
                                totalPages={totalPages}
                                onPageChange={(page) => updateParams({ page: String(page) })}
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
