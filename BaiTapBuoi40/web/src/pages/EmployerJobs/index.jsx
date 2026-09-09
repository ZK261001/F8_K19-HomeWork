import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import WhatshotOutlined from "@mui/icons-material/WhatshotOutlined";

import EmployerTabs from "../../components/EmployerTabs";
import PillTabs from "../../components/PillTabs";
import { findCompanyByEmail } from "../../api/companies";
import { fetchAllJobs, fetchAllJobsByCompanyId } from "../../api/jobs";
import { useAuth } from "../../context/AuthContext";
import { daysUntil, formatDate } from "../../utils/date";
import { formatSalary, formatWorkLocation, jobTypeLabel } from "../../utils/format";
import styles from "./EmployerJobs.module.css";

const FILTER_ALL = "ALL";
const FILTER_ACTIVE = "ACTIVE";
const FILTER_EXPIRED = "EXPIRED";

// Hạn nộp là thứ duy nhất suy ra được tình trạng tin: API chỉ trả về tin
// PUBLISHED và không có endpoint nào đổi status sau khi tạo.
const EXPIRING_SOON_DAYS = 7;

function getJobState(job) {
    const days = daysUntil(job.deadline);
    if (days == null) return { key: FILTER_ACTIVE, label: "Đang tuyển", tone: "success" };
    if (days < 0) return { key: FILTER_EXPIRED, label: "Hết hạn", tone: "neutral" };
    if (days <= EXPIRING_SOON_DAYS) {
        return {
            key: FILTER_ACTIVE,
            label: days === 0 ? "Hết hạn hôm nay" : `Còn ${days} ngày`,
            tone: "warn",
        };
    }
    return { key: FILTER_ACTIVE, label: "Đang tuyển", tone: "success" };
}

function EmployerJobs() {
    const { user } = useAuth();
    const isAdmin = user?.role === "ADMIN";

    const [state, setState] = useState({ status: "loading", jobs: [], company: null });
    const [filter, setFilter] = useState(FILTER_ALL);

    // Gộp trong một effect async: mọi setState nằm trong callback của promise
    // nên không vi phạm react-hooks/set-state-in-effect.
    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                // Admin không gắn với công ty nào nên xem toàn bộ tin hệ thống.
                if (isAdmin) {
                    const all = await fetchAllJobs();
                    if (!cancelled) setState({ status: "ready", jobs: all, company: null });
                    return;
                }

                const found = await findCompanyByEmail(user.email);
                if (!found) {
                    if (!cancelled) setState({ status: "no-company", jobs: [], company: null });
                    return;
                }

                const mine = await fetchAllJobsByCompanyId(found.id);
                if (!cancelled) setState({ status: "ready", jobs: mine, company: found });
            } catch {
                if (!cancelled) setState({ status: "error", jobs: [], company: null });
            }
        }

        if (isAdmin || user?.email) load();
        return () => {
            cancelled = true;
        };
    }, [user?.email, isAdmin]);

    const { jobs, company, status } = state;

    const rows = useMemo(
        () => jobs.map((job) => ({ job, jobState: getJobState(job) })),
        [jobs],
    );

    const activeCount = rows.filter((r) => r.jobState.key === FILTER_ACTIVE).length;
    const expiredCount = rows.length - activeCount;

    const visibleRows =
        filter === FILTER_ALL ? rows : rows.filter((r) => r.jobState.key === filter);

    if (status === "loading") {
        return (
            <div className={styles.page}>
                <EmployerTabs />
                <p className={styles.stateBlock}>Đang tải danh sách tin...</p>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className={styles.page}>
                <EmployerTabs />
                <p className={styles.stateBlock}>
                    Không tải được danh sách tin. Vui lòng tải lại trang.
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

            <h1 className={styles.heading}>
                {isAdmin ? "Toàn bộ tin tuyển dụng" : "Tin tuyển dụng đã đăng"}
            </h1>
            <p className={styles.subheading}>
                {isAdmin
                    ? `${rows.length} tin trên toàn hệ thống.`
                    : `${company?.company_name} — ${rows.length} tin đã đăng.`}
            </p>

            <div className={styles.filterRow}>
                <PillTabs
                    tabs={[
                        { key: FILTER_ALL, label: `Tất cả (${rows.length})` },
                        { key: FILTER_ACTIVE, label: `Đang tuyển (${activeCount})` },
                        { key: FILTER_EXPIRED, label: `Hết hạn (${expiredCount})` },
                    ]}
                    activeKey={filter}
                    onChange={setFilter}
                />
            </div>

            {visibleRows.length === 0 ? (
                <div className={styles.empty}>
                    <p className={styles.emptyTitle}>
                        {rows.length === 0 ? "Chưa có tin tuyển dụng nào" : "Không có tin ở mục này"}
                    </p>
                    {rows.length === 0 && !isAdmin && (
                        <Link to="/nha-tuyen-dung" className={styles.emptyLink}>
                            Đăng tin đầu tiên
                        </Link>
                    )}
                </div>
            ) : (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.th}>Vị trí</th>
                                {isAdmin && <th className={styles.th}>Công ty</th>}
                                <th className={styles.th}>Hình thức</th>
                                <th className={styles.th}>Mức lương</th>
                                <th className={styles.th}>Địa điểm</th>
                                <th className={styles.th}>Hạn nộp</th>
                                <th className={styles.th}>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleRows.map(({ job, jobState }) => (
                                <tr className={styles.row} key={job.id}>
                                    <td className={styles.td}>
                                        <Link
                                            to={`/viec-lam/${job.slug ?? job.id}`}
                                            className={styles.jobLink}
                                        >
                                            {job.title}
                                            {job.is_hot && (
                                                <span className={styles.hotBadge}>
                                                    <WhatshotOutlined className={styles.hotIcon} />
                                                    HOT
                                                </span>
                                            )}
                                        </Link>
                                        <span className={styles.jobCategory}>{job.category}</span>
                                    </td>
                                    {isAdmin && (
                                        <td className={styles.td}>{job.company?.company_name}</td>
                                    )}
                                    <td className={styles.td}>{jobTypeLabel(job.job_type)}</td>
                                    <td className={styles.td}>{formatSalary(job.salary)}</td>
                                    <td className={styles.td}>
                                        {formatWorkLocation(job.work_location)}
                                    </td>
                                    <td className={styles.td}>{formatDate(job.deadline)}</td>
                                    <td className={styles.td}>
                                        <span className={styles[`status_${jobState.tone}`]}>
                                            {jobState.label}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default EmployerJobs;
