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
import { CITIES } from "../../constants/cities";
import styles from "./Homepage.module.css";

function Homepage() {
    const [jobs, setJobs] = useState([]);
    const [cityJobs, setCityJobs] = useState([]);
    const [selectedCityId, setSelectedCityId] = useState(null);
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

    // Lọc địa điểm gọi lại API theo city_id thay vì lọc tay trên trang đầu —
    // nếu không, việc làm ở trang 2 trở đi sẽ không bao giờ hiện ra.
    useEffect(() => {
        if (!selectedCityId) return;

        let cancelled = false;
        listJobs({ page: 1, cityId: selectedCityId }).then(({ data }) => {
            if (!cancelled) setCityJobs(data);
        });
        return () => {
            cancelled = true;
        };
    }, [selectedCityId]);

    const listingJobs = selectedCityId ? cityJobs : jobs;

    // API trả danh mục theo nhóm (group -> categories con); trang chủ chỉ
    // cần danh sách lĩnh vực phẳng để hiển thị/liên kết như trước.
    const categories = useMemo(
        () => categoryGroups.flatMap((group) => group.categories),
        [categoryGroups],
    );

    const activeCategory = hoveredCategoryId
        ? categories.find((c) => c.id === hoveredCategoryId)
        : null;

    return (
        <div>
            <TopPromoBanner />
            <HeroSection
                categories={categories}
                locations={CITIES}
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

            <JobListingSection
                jobs={listingJobs}
                locations={CITIES}
                selectedCityId={selectedCityId}
                onSelectCity={setSelectedCityId}
            />
        </div>
    );
}

export default Homepage;
