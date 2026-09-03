import { jobTypeLabel } from "../../../../utils/format";
import styles from "./JobFilterSidebar.module.css";

const JOB_TYPES = ["FULL_TIME", "PART_TIME", "FREELANCE", "INTERNSHIP"];

function JobFilterSidebar({ categoryOptions, filters, onFilterChange }) {
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
                <label className={styles.label} htmlFor="filter-jobtype">
                    Hình thức làm việc
                </label>
                <select
                    id="filter-jobtype"
                    className={styles.select}
                    value={filters.jobType}
                    onChange={(e) => onFilterChange("jobType", e.target.value)}
                >
                    <option value="">Tất cả</option>
                    {JOB_TYPES.map((type) => (
                        <option key={type} value={type}>
                            {jobTypeLabel(type)}
                        </option>
                    ))}
                </select>
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
