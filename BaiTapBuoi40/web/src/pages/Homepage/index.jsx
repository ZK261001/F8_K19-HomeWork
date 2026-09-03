import { useEffect, useMemo, useRef, useState } from "react";

import TopPromoBanner from "./components/TopPromoBanner";
import HeroSection from "./components/HeroSection";
import CategoryList from "./components/CategoryList";
import CategoryDetailPanel from "../../components/CategoryDetailPanel";
import FeatureBanner from "./components/FeatureBanner";
import JobListingSection from "./components/JobListingSection";
import { listJobs } from "../../api/jobs";
import { listCompanies } from "../../api/companies";
import { listCategoryGroups } from "../../api/categories";
import styles from "./Homepage.module.css";

function Homepage() {
    const [jobs, setJobs] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [categoryGroups, setCategoryGroups] = useState([]);
    const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
    const [categoryListHeight, setCategoryListHeight] = useState(null);
    const categoryListRef = useRef(null);

    useEffect(() => {
        const el = categoryListRef.current;
        if (!el) return;

        const observer = new ResizeObserver(() => {
            setCategoryListHeight(el.offsetHeight);
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        listJobs({ page: 1 }).then(({ data }) => setJobs(data));
        listCompanies({ page: 1 }).then(({ data }) => setCompanies(data));
        listCategoryGroups().then(setCategoryGroups);
    }, []);

    // API trả danh mục theo nhóm (group -> categories con); trang chủ chỉ
    // cần danh sách lĩnh vực phẳng để hiển thị/liên kết như trước.
    const categories = useMemo(
        () => categoryGroups.flatMap((group) => group.categories),
        [categoryGroups],
    );

    // Không còn endpoint /locations — suy ra địa điểm từ các job đã tải.
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

    const activeCategory = hoveredCategoryId
        ? categories.find((c) => c.id === hoveredCategoryId)
        : null;

    return (
        <div>
            <TopPromoBanner />
            <HeroSection
                categories={categories}
                locations={locations}
                jobs={jobs}
                companies={companies}
            />

            <div className={styles.overlapRow} onMouseLeave={() => setHoveredCategoryId(null)}>
                <CategoryList
                    ref={categoryListRef}
                    categories={categories}
                    activeId={activeCategory?.id}
                    onHoverCategory={setHoveredCategoryId}
                />
                {activeCategory ? (
                    <CategoryDetailPanel
                        category={activeCategory}
                        height={categoryListHeight ?? undefined}
                    />
                ) : (
                    <FeatureBanner />
                )}
            </div>

            <JobListingSection jobs={jobs} locations={locations} />
        </div>
    );
}

export default Homepage;
