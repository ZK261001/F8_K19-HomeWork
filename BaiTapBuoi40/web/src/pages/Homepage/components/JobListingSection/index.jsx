import { useMemo, useState } from "react";
import { Link } from "react-router";

import PillTabs from "../../../../components/PillTabs";
import Pagination from "../../../../components/Pagination";
import JobCard from "../../../../components/JobCard";
import LocationFilterRow from "../LocationFilterRow";
import TipBanner from "../TipBanner";
import styles from "./JobListingSection.module.css";

const TABS = [
    { key: "van-phong", label: "Việc văn phòng" },
    { key: "pho-thong", label: "Việc phổ thông" },
];

const PAGE_SIZE = 6;
const TOP_COUNT = 2;

function JobListingSection({ jobs = [], companies = [], locations = [] }) {
    const [activeTab, setActiveTab] = useState(TABS[0].key);
    const [selectedLocationId, setSelectedLocationId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isTipDismissed, setIsTipDismissed] = useState(false);

    const companyById = useMemo(
        () => new Map(companies.map((c) => [String(c.id), c])),
        [companies],
    );
    const locationById = useMemo(
        () => new Map(locations.map((l) => [String(l.id), l])),
        [locations],
    );

    const activeJobs = useMemo(() => jobs.filter((job) => job.status === "active"), [jobs]);

    const topJobIds = useMemo(() => {
        const sorted = [...activeJobs].sort((a, b) => b.viewCount - a.viewCount);
        return new Set(sorted.slice(0, TOP_COUNT).map((job) => job.id));
    }, [activeJobs]);

    const filteredJobs = useMemo(() => {
        return activeJobs.filter((job) => {
            if (job.jobType !== activeTab) return false;
            if (selectedLocationId && String(job.locationId) !== String(selectedLocationId)) {
                return false;
            }
            return true;
        });
    }, [activeJobs, activeTab, selectedLocationId]);

    const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));
    const start = (currentPage - 1) * PAGE_SIZE;
    const visibleJobs = filteredJobs.slice(start, start + PAGE_SIZE);

    const handleTabChange = (tabKey) => {
        setActiveTab(tabKey);
        setCurrentPage(1);
    };

    const handleSelectLocation = (locationId) => {
        setSelectedLocationId(locationId);
        setCurrentPage(1);
    };

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <h2 className={styles.heading}>Việc làm tốt nhất</h2>
                    <PillTabs tabs={TABS} activeKey={activeTab} onChange={handleTabChange} />
                </div>
                <Link to="/viec-lam" className={styles.viewAll}>
                    Xem tất cả
                </Link>
            </div>

            <LocationFilterRow
                locations={locations}
                selectedLocationId={selectedLocationId}
                onSelectLocation={handleSelectLocation}
            />

            {!isTipDismissed && <TipBanner onDismiss={() => setIsTipDismissed(true)} />}

            {visibleJobs.length > 0 ? (
                <div className={styles.grid}>
                    {visibleJobs.map((job) => (
                        <JobCard
                            key={job.id}
                            job={job}
                            company={companyById.get(String(job.companyId))}
                            location={locationById.get(String(job.locationId))}
                            isTop={topJobIds.has(job.id)}
                        />
                    ))}
                </div>
            ) : (
                <p className={styles.empty}>Không có việc làm phù hợp với bộ lọc hiện tại.</p>
            )}

            {filteredJobs.length > 0 && (
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
