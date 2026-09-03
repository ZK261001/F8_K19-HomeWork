import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";

import CategoryDetailPanel from "../../components/CategoryDetailPanel";
import JobCard from "../../components/JobCard";
import Pagination from "../../components/Pagination";
import { listJobs } from "../../api/jobs";
import { listCategoryGroups } from "../../api/categories";
import styles from "./CategoryDetail.module.css";

const PAGE_SIZE = 20;

function CategoryDetail() {
    const { slug } = useParams();

    const [categoryGroups, setCategoryGroups] = useState([]);
    const [categoriesLoaded, setCategoriesLoaded] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [total, setTotal] = useState(0);
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
        listCategoryGroups().then((data) => {
            setCategoryGroups(data);
            setCategoriesLoaded(true);
        });
    }, []);

    const category = useMemo(
        () => categoryGroups.flatMap((group) => group.categories).find((c) => c.slug === slug),
        [categoryGroups, slug],
    );

    useEffect(() => {
        if (!category) return;
        listJobs({ page: currentPage, categorySlug: category.slug }).then(
            ({ data, total: totalCount }) => {
                setJobs(data);
                setTotal(totalCount);
            },
        );
    }, [category, currentPage]);

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

    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    return (
        <div className={styles.page}>
            <h1 className={styles.heading}>
                Việc làm {category.name} ({total} việc làm)
            </h1>

            <CategoryDetailPanel category={category} />

            {jobs.length > 0 ? (
                <div className={styles.grid}>
                    {jobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            ) : (
                <p className={styles.empty}>Chưa có việc làm nào trong lĩnh vực này.</p>
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
    );
}

export default CategoryDetail;
