import { useMemo } from "react";
import { Link } from "react-router";
import { Avatar } from "@mui/material";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import BadgeOutlined from "@mui/icons-material/BadgeOutlined";

import { useAuth } from "../../context/AuthContext";
import { roleLabel } from "../../utils/format";
import { formatDate } from "../../utils/date";
import { getAppliedJobs } from "../../utils/applyStorage";
import styles from "./Profile.module.css";

function Profile() {
    const { user } = useAuth();

    // API chỉ trả email/role cho tài khoản đang đăng nhập (không có
    // fullName/phone/avatar), và không có endpoint "đơn đã ứng tuyển" — lịch
    // sử ứng tuyển được lưu cục bộ trong trình duyệt khi ứng tuyển thành công.
    const appliedJobs = useMemo(() => {
        if (!user) return [];
        return [...getAppliedJobs(user.id)].sort(
            (a, b) => new Date(b.appliedAt) - new Date(a.appliedAt),
        );
    }, [user]);

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.top}>
                    <Avatar className={styles.avatar}>{user?.email?.charAt(0).toUpperCase()}</Avatar>
                    <h1 className={styles.name}>{user?.email}</h1>
                </div>

                <ul className={styles.infoList}>
                    <li className={styles.infoRow}>
                        <EmailOutlined className={styles.infoIcon} />
                        <span>
                            Email: <strong>{user?.email}</strong>
                        </span>
                    </li>
                    <li className={styles.infoRow}>
                        <BadgeOutlined className={styles.infoIcon} />
                        <span>
                            Vai trò: <strong>{roleLabel(user?.role)}</strong>
                        </span>
                    </li>
                </ul>
            </div>

            <div className={styles.appliedSection}>
                <h2 className={styles.appliedTitle}>Việc làm đã ứng tuyển</h2>

                {appliedJobs.length === 0 ? (
                    <p className={styles.appliedEmpty}>Bạn chưa ứng tuyển việc làm nào.</p>
                ) : (
                    <ul className={styles.appliedGrid}>
                        {appliedJobs.map((entry) => (
                            <li key={entry.jobSlug} className={styles.appliedItem}>
                                <Link to={`/viec-lam/${entry.jobSlug}`} className={styles.appliedLink}>
                                    <span className={styles.appliedJobTitle}>{entry.jobTitle}</span>
                                    <span className={styles.appliedCompany}>{entry.companyName}</span>
                                </Link>
                                <span className={styles.appliedStatus}>
                                    Đã ứng tuyển · {formatDate(entry.appliedAt)}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Profile;
