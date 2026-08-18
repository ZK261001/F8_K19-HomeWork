import styles from "./JobFilterSidebar.module.css";

function JobFilterSidebar({
    categoryOptions,
    industryOptions,
    workTypeOptions,
    experienceOptions,
    salaryOptions,
    filters,
    onFilterChange,
}) {
    return (
        <aside className={styles.sidebar}>
            <h2 className={styles.title}>Bộ lọc</h2>

            <div className={styles.field}>
                <label className={styles.label} htmlFor="filter-category">
                    Nhóm ngành
                </label>
                <select
                    id="filter-category"
                    className={styles.select}
                    value={filters.categoryId}
                    onChange={(e) => onFilterChange("categoryId", e.target.value)}
                >
                    <option value="">Tất cả</option>
                    {categoryOptions.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.field}>
                <label className={styles.label} htmlFor="filter-industry">
                    Ngành nghề
                </label>
                <select
                    id="filter-industry"
                    className={styles.select}
                    value={filters.industry}
                    onChange={(e) => onFilterChange("industry", e.target.value)}
                >
                    <option value="">Tất cả</option>
                    {industryOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.field}>
                <label className={styles.label} htmlFor="filter-worktype">
                    Hình thức làm việc
                </label>
                <select
                    id="filter-worktype"
                    className={styles.select}
                    value={filters.workType}
                    onChange={(e) => onFilterChange("workType", e.target.value)}
                >
                    <option value="">Tất cả</option>
                    {workTypeOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.field}>
                <label className={styles.label} htmlFor="filter-experience">
                    Kinh nghiệm
                </label>
                <select
                    id="filter-experience"
                    className={styles.select}
                    value={filters.experience}
                    onChange={(e) => onFilterChange("experience", e.target.value)}
                >
                    <option value="">Tất cả</option>
                    {experienceOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.field}>
                <label className={styles.label} htmlFor="filter-salary">
                    Mức lương từ
                </label>
                <select
                    id="filter-salary"
                    className={styles.select}
                    value={filters.minSalary}
                    onChange={(e) => onFilterChange("minSalary", e.target.value)}
                >
                    <option value="">Tất cả</option>
                    {salaryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <p className={styles.hint}>Tin lương thoả thuận sẽ không nằm trong kết quả</p>
            </div>

            <label className={styles.checkboxRow}>
                <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={filters.hotOnly}
                    onChange={(e) => onFilterChange("hotOnly", e.target.checked)}
                />
                Chỉ hiện tin nổi bật
            </label>
        </aside>
    );
}

export default JobFilterSidebar;
