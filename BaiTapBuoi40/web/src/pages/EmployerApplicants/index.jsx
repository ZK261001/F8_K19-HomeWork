import { useEffect, useState } from "react";
import { Link } from "react-router";

import EmployerTabs from "../../components/EmployerTabs";
import { findCompanyByEmail } from "../../api/companies";
import { fetchAllJobs, fetchAllJobsByCompanyId } from "../../api/jobs";
import { useAuth } from "../../context/AuthContext";
import { getAllApplications } from "../../utils/applyStorage";
import { formatDateTime } from "../../utils/date";
import styles from "./EmployerApplicants.module.css";

const ALL_JOBS = "ALL";

function EmployerApplicants() {
    const { user } = useAuth();
    const isAdmin = user?.role === "ADMIN";

    const [status, setStatus] = useState("loading");
    const [jobs, setJobs] = useState([]);
    const [selectedJobId, setSelectedJobId] = useState(ALL_JOBS);

    // Lấy danh sách tin của công ty (admin lấy toàn bộ), giống trang "Tin đã đăng".
    useEffect(() => {
        let cancelled = false;

        async function loadJobs() {
            try {
                if (isAdmin) {
                    const allJobs = await fetchAllJobs();
                    if (!cancelled) {
                        setJobs(allJobs);
                        setStatus("ready");
                    }
                    return;
                }

                const company = await findCompanyByEmail(user.email);
                if (!company) {
                    if (!cancelled) setStatus("no-company");
                    return;
                }

                const myJobs = await fetchAllJobsByCompanyId(company.id);
                if (!cancelled) {
                    setJobs(myJobs);
                    setStatus("ready");
                }
            } catch {
                if (!cancelled) setStatus("error");
            }
        }

        if (isAdmin || user?.email) loadJobs();
        return () => {
            cancelled = true;
        };
    }, [user?.email, isAdmin]);

    // Chỉ giữ những đơn nộp vào tin của mình, đơn mới nhất lên đầu.
    const myJobIds = jobs.map((job) => job.id);
    const myApplications = getAllApplications()
        .filter((app) => myJobIds.includes(app.jobId))
        .sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt));

    const visibleApplications =
        selectedJobId === ALL_JOBS
            ? myApplications
            : myApplications.filter((app) => app.jobId === selectedJobId);

    function findJob(jobId) {
        return jobs.find((job) => job.id === jobId);
    }

    if (status === "loading") {
        return (
            <div className={styles.page}>
                <EmployerTabs />
                <p className={styles.stateBlock}>Đang tải danh sách ứng viên...</p>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className={styles.page}>
                <EmployerTabs />
                <p className={styles.stateBlock}>
                    Không tải được danh sách ứng viên. Vui lòng tải lại trang.
                </p>
            </div>
        );
    }

    if (status === "no-company") {
        return (
            <div className={styles.page}>
                <EmployerTabs />
                <p className={styles.noticeWarn}>
                    Không tìm thấy công ty gắn với email <strong>{user?.email}</strong>. Tài khoản
                    cần được tạo qua luồng đăng ký nhà tuyển dụng thì mới có tin tuyển dụng.
                </p>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <EmployerTabs />

            <h1 className={styles.heading}>Ứng viên đã ứng tuyển</h1>
            <p className={styles.subheading}>{myApplications.length} lượt ứng tuyển.</p>

            <div className={styles.filterRow}>
                <label className={styles.filterLabel} htmlFor="job-filter">
                    Lọc theo tin:
                </label>
                <select
                    id="job-filter"
                    className={styles.select}
                    value={selectedJobId}
                    onChange={(event) => setSelectedJobId(event.target.value)}
                >
                    <option value={ALL_JOBS}>Tất cả tin ({jobs.length})</option>
                    {jobs.map((job) => (
                        <option key={job.id} value={job.id}>
                            {job.title}
                        </option>
                    ))}
                </select>
            </div>

            {visibleApplications.length === 0 ? (
                <div className={styles.empty}>
                    <p className={styles.emptyTitle}>Chưa có ứng viên nào</p>
                </div>
            ) : (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.th}>Họ và tên</th>
                                <th className={styles.th}>Email</th>
                                <th className={styles.th}>Số điện thoại</th>
                                <th className={styles.th}>Kỹ năng</th>
                                <th className={styles.th}>Vị trí ứng tuyển</th>
                                <th className={styles.th}>Ngày nộp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleApplications.map((app) => {
                                const job = findJob(app.jobId);
                                return (
                                    <tr className={styles.row} key={`${app.jobId}-${app.candidateId}`}>
                                        <td className={styles.td}>
                                            <strong>{app.fullName}</strong>
                                        </td>
                                        <td className={styles.td}>{app.email || "—"}</td>
                                        <td className={styles.td}>{app.phone || "—"}</td>
                                        <td className={styles.td}>
                                            {app.skills.length > 0 ? app.skills.join(", ") : "—"}
                                        </td>
                                        <td className={styles.td}>
                                            <Link
                                                to={`/viec-lam/${job.slug ?? job.id}`}
                                                className={styles.jobLink}
                                            >
                                                {job.title}
                                            </Link>
                                        </td>
                                        <td className={styles.td}>
                                            {formatDateTime(app.appliedAt)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default EmployerApplicants;
