import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";

import CategoryDetailPanel from "../../components/CategoryDetailPanel";
import JobCard from "../../components/JobCard";
import Pagination from "../../components/Pagination";
import styles from "./CategoryDetail.module.css";

const API_URL = "http://localhost:3000";
const PAGE_SIZE = 9;

function CategoryDetail() {
    const { slug } = useParams();

    const [categories, setCategories] = useState([]);
    const [categoriesLoaded, setCategoriesLoaded] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [locations, setLocations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [prevSlug, setPrevSlug] = useState(slug);
    if (slug !== prevSlug) {
        setPrevSlug(slug);
        setCurrentPage(1);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    useEffect(() => {
        fetch(`${API_URL}/categories`)
            .then((res) => res.json())
            .then((data) => {
                setCategories(data);
                setCategoriesLoaded(true);
            });

        fetch(`${API_URL}/jobs`)
            .then((res) => res.json())
            .then(setJobs);

        fetch(`${API_URL}/companies`)
            .then((res) => res.json())
            .then(setCompanies);

        fetch(`${API_URL}/locations`)
            .then((res) => res.json())
            .then(setLocations);
    }, []);

    const category = useMemo(
        () =>
            categories.find((c) => c.slug === slug) ??
            categories.find((c) => String(c.id) === slug) ??
            null,
        [categories, slug],
    );

    const companyById = useMemo(
        () => new Map(companies.map((c) => [String(c.id), c])),
        [companies],
    );
    const locationById = useMemo(
        () => new Map(locations.map((l) => [String(l.id), l])),
        [locations],
    );

    const categoryJobs = useMemo(() => {
        if (!category) return [];
        return jobs.filter(
            (job) => job.status === "active" && String(job.categoryId) === String(category.id),
        );
    }, [jobs, category]);

    if (!categoriesLoaded) {
        return (
            <div className={styles.page}>
                <p className={styles.loading}>Đang tải...</p>
            </div>
        );
    }

    if (!category) {
        return (
            <div className={styles.page}>
                <p className={styles.notFound}>
                    Không tìm thấy lĩnh vực này.{" "}
                    <Link to="/viec-lam" className={styles.notFoundLink}>
                        Xem tất cả việc làm
                    </Link>
                </p>
            </div>
        );
    }

    const totalPages = Math.max(1, Math.ceil(categoryJobs.length / PAGE_SIZE));
    const start = (currentPage - 1) * PAGE_SIZE;
    const visibleJobs = categoryJobs.slice(start, start + PAGE_SIZE);

    return (
        <div className={styles.page}>
            <h1 className={styles.heading}>
                Việc làm {category.name} ({categoryJobs.length} việc làm)
            </h1>

            <CategoryDetailPanel category={category} />

            {visibleJobs.length > 0 ? (
                <div className={styles.grid}>
                    {visibleJobs.map((job) => (
                        <JobCard
                            key={job.id}
                            job={job}
                            company={companyById.get(String(job.companyId))}
                            location={locationById.get(String(job.locationId))}
                        />
                    ))}
                </div>
            ) : (
                <p className={styles.empty}>Chưa có việc làm nào trong lĩnh vực này.</p>
            )}

            {categoryJobs.length > 0 && (
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
    );
}

export default CategoryDetail;
