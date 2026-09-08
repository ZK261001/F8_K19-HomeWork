import { useMemo, useState } from "react";
import { Link } from "react-router";

import Pagination from "../../../../components/Pagination";
import JobCard from "../../../../components/JobCard";
import LocationFilterRow from "../LocationFilterRow";
import TipBanner from "../TipBanner";
import styles from "./JobListingSection.module.css";

const PAGE_SIZE = 6;
const TOP_COUNT = 2;

function JobListingSection({ jobs = [], locations = [], selectedCityId, onSelectCity }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [isTipDismissed, setIsTipDismissed] = useState(false);

    const topJobIds = useMemo(() => {
        const sorted = [...jobs].sort((a, b) => Number(b.is_hot) - Number(a.is_hot));
        return new Set(sorted.slice(0, TOP_COUNT).map((job) => job.id));
    }, [jobs]);

    // Lọc theo tỉnh do Homepage gọi lại API, ở đây chỉ phân trang danh sách nhận được.
    const totalPages = Math.max(1, Math.ceil(jobs.length / PAGE_SIZE));
    const start = (currentPage - 1) * PAGE_SIZE;
    const visibleJobs = jobs.slice(start, start + PAGE_SIZE);

    const handleSelectLocation = (cityId) => {
        onSelectCity(cityId);
        setCurrentPage(1);
    };

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <h2 className={styles.heading}>Việc làm tốt nhất</h2>
                </div>
                <Link to="/viec-lam" className={styles.viewAll}>
                    Xem tất cả
                </Link>
            </div>

            <LocationFilterRow
                locations={locations}
                selectedLocationId={selectedCityId}
                onSelectLocation={handleSelectLocation}
            />

            {!isTipDismissed && <TipBanner onDismiss={() => setIsTipDismissed(true)} />}

            {visibleJobs.length > 0 ? (
                <div className={styles.grid}>
                    {visibleJobs.map((job) => (
                        <JobCard key={job.id} job={job} isTop={topJobIds.has(job.id)} />
                    ))}
                </div>
            ) : (
                <p className={styles.empty}>Không có việc làm phù hợp với bộ lọc hiện tại.</p>
            )}

            {jobs.length > 0 && (
                <div className={styles.paginationWrapper}>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        label="{current} / {total} trang"
                    />
                </div>
            )}
        </section>
    );
}

export default JobListingSection;
