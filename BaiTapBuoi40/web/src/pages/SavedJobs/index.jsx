import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

import JobCard from "../../components/JobCard";
import { fetchAllJobs } from "../../api/jobs";
import { useSavedJobs } from "../../context/SavedJobsContext";
import { formatDateTime } from "../../utils/date";
import styles from "./SavedJobs.module.css";

const SIMILAR_LIMIT = 6;

function SavedJobs() {
    const { savedJobs, savedCount } = useSavedJobs();
    const [allJobs, setAllJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // API không có endpoint lấy job theo lô id, nên quét các trang công khai một
    // lần rồi dùng chung cho cả danh sách đã lưu lẫn mục việc làm tương tự.
    useEffect(() => {
        let cancelled = false;
        fetchAllJobs()
            .then((jobs) => {
                if (!cancelled) setAllJobs(jobs);
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    // Tin đã lưu nhưng không còn trong dữ liệu công khai (đã đóng, hoặc nằm
    // ngoài số trang quét được) thì bỏ qua thay vì hiện thẻ rỗng.
    const savedJobDetails = useMemo(() => {
        const jobById = new Map(allJobs.map((job) => [job.id, job]));
        return savedJobs
            .map((entry) => ({ job: jobById.get(entry.id), savedAt: entry.savedAt }))
            .filter((item) => Boolean(item.job));
    }, [allJobs, savedJobs]);

    const similarJobs = useMemo(() => {
        if (savedJobDetails.length === 0) return [];
        const savedIds = new Set(savedJobDetails.map((item) => item.job.id));
        const savedCategories = new Set(savedJobDetails.map((item) => item.job.category));
        return allJobs
            .filter((job) => !savedIds.has(job.id) && savedCategories.has(job.category))
            .slice(0, SIMILAR_LIMIT);
    }, [allJobs, savedJobDetails]);

    return (
        <div className={styles.page}>
            <h1 className={styles.heading}>
                Danh sách <span className={styles.count}>{savedCount}</span> việc làm đã lưu
            </h1>

            {isLoading ? (
                <p className={styles.loading}>Đang tải...</p>
            ) : savedJobDetails.length > 0 ? (
                <ul className={styles.grid}>
                    {savedJobDetails.map(({ job, savedAt }) => (
                        <li key={job.id} className={styles.gridItem}>
                            <JobCard job={job} />
                            {savedAt && (
                                <p className={styles.savedAt}>Đã lưu: {formatDateTime(savedAt)}</p>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.empty}>
                    Bạn chưa lưu việc làm nào.{" "}
                    <Link to="/viec-lam" className={styles.emptyLink}>
                        Xem việc làm đang tuyển
                    </Link>
                </p>
            )}

            {similarJobs.length > 0 && (
                <>
                    <h2 className={styles.subHeading}>Việc làm tương tự việc bạn đã lưu</h2>
                    <ul className={styles.grid}>
                        {similarJobs.map((job) => (
                            <li key={job.id} className={styles.gridItem}>
                                <JobCard job={job} />
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default SavedJobs;
