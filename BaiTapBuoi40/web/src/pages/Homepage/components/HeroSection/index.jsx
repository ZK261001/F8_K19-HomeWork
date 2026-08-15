import SearchBar from "../../../../components/SearchBar";
import FilterChip from "../../../../components/FilterChip";
import styles from "./HeroSection.module.css";

const FALLBACK_SUGGESTIONS = [
    "Business analyst",
    "Nhân viên kinh doanh",
    "Lập trình viên",
    "Marketing",
    "Kế toán",
];

function HeroSection({ categories = [], locations = [], jobs = [], companies = [] }) {
    const suggestions = categories.length
        ? categories.slice(0, 5).map((category) => category.name)
        : FALLBACK_SUGGESTIONS;

    return (
        <div className={styles.hero}>
            <div className={styles.inner}>
                <h1 className={styles.title}>TopCV - Tạo CV, Tìm việc làm, Tuyển dụng hiệu quả</h1>

                <SearchBar
                    locations={locations}
                    categories={categories}
                    jobs={jobs}
                    companies={companies}
                />

                <div className={styles.suggestions}>
                    <span className={styles.suggestionsLabel}>Gợi ý:</span>
                    {suggestions.map((label) => (
                        <FilterChip key={label} label={label} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
