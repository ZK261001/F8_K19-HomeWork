import { CITIES } from "../../../../constants/cities";
import { GENDERS, JOB_TYPES, SALARY_RANGES } from "../../../../constants/jobFilters";
import { genderLabel, jobTypeLabel } from "../../../../utils/format";
import styles from "./JobFilterSidebar.module.css";

function JobFilterSidebar({
    categoryGroups = [],
    experienceOptions = [],
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
                    onChange={(e) => onFilterChange("category", e.target.value)}
                >
                    <option value="">Tất cả</option>
                    {categoryGroups.map((group) => (
                        <optgroup key={group.id} label={group.group_name}>
                            {group.categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </optgroup>
                    ))}
                </select>
            </div>

            <div className={styles.field}>
                <label className={styles.label} htmlFor="filter-city">
                    Địa điểm
                </label>
                <select
                    id="filter-city"
                    className={styles.select}
                    value={filters.cityId}
                    onChange={(e) => onFilterChange("city", e.target.value)}
                >
                    <option value="">Toàn quốc</option>
                    {CITIES.map((city) => (
                        <option key={city.id} value={city.id}>
                            {city.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.field}>
                <label className={styles.label} htmlFor="filter-salary">
                    Mức lương
                </label>
                <select
                    id="filter-salary"
                    className={styles.select}
                    value={filters.salaryRange}
                    onChange={(e) => onFilterChange("salary", e.target.value)}
                >
                    <option value="">Tất cả</option>
                    {SALARY_RANGES.map((range) => (
                        <option key={range.key} value={range.key}>
                            {range.label}
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
                    onChange={(e) => onFilterChange("job_type", e.target.value)}
                >
                    <option value="">Tất cả</option>
                    {JOB_TYPES.map((type) => (
                        <option key={type} value={type}>
                            {jobTypeLabel(type)}
                        </option>
                    ))}
                </select>
            </div>

            {/* Kinh nghiệm là chuỗi tự do do nhà tuyển dụng nhập, không phải enum,
                nên danh sách lấy từ chính dữ liệu đang có. Chưa tin nào khai thì
                ẩn hẳn ô này thay vì hiện một dropdown rỗng. */}
            {experienceOptions.length > 0 && (
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="filter-experience">
                        Kinh nghiệm
                    </label>
                    <select
                        id="filter-experience"
                        className={styles.select}
                        value={filters.experience}
                        onChange={(e) => onFilterChange("exp", e.target.value)}
                    >
                        <option value="">Tất cả</option>
                        {experienceOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <p className={styles.hint}>Theo mức kinh nghiệm các tin đang yêu cầu.</p>
                </div>
            )}

            <div className={styles.field}>
                <label className={styles.label} htmlFor="filter-gender">
                    Giới tính
                </label>
                <select
                    id="filter-gender"
                    className={styles.select}
                    value={filters.gender}
                    onChange={(e) => onFilterChange("gender", e.target.value)}
                >
                    <option value="">Tất cả</option>
                    {GENDERS.map((gender) => (
                        <option key={gender} value={gender}>
                            {genderLabel(gender)}
                        </option>
                    ))}
                </select>
            </div>

            <label className={styles.checkboxRow}>
                <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={filters.hotOnly}
                    onChange={(e) => onFilterChange("hot", e.target.checked ? "1" : "")}
                />
                Chỉ hiện tin nổi bật
            </label>
        </aside>
    );
}

export default JobFilterSidebar;
