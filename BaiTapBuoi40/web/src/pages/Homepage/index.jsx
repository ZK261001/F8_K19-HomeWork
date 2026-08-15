import { useEffect, useRef, useState } from "react";

import TopPromoBanner from "./components/TopPromoBanner";
import HeroSection from "./components/HeroSection";
import CategoryList from "./components/CategoryList";
import CategoryDetailPanel from "./components/CategoryDetailPanel";
import FeatureBanner from "./components/FeatureBanner";
import JobListingSection from "./components/JobListingSection";
import styles from "./Homepage.module.css";

const API_URL = "http://localhost:3000";

function Homepage() {
    const [jobs, setJobs] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
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

            <JobListingSection jobs={jobs} companies={companies} locations={locations} />
        </div>
    );
}

export default Homepage;
