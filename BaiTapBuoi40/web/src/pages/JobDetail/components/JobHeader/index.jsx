import WhatshotOutlined from "@mui/icons-material/WhatshotOutlined";
import PlaceOutlined from "@mui/icons-material/PlaceOutlined";
import PaymentsOutlined from "@mui/icons-material/PaymentsOutlined";
import WorkHistoryOutlined from "@mui/icons-material/WorkHistoryOutlined";
import EventOutlined from "@mui/icons-material/EventOutlined";
import SendOutlined from "@mui/icons-material/SendOutlined";
import BookmarkBorderOutlined from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlined from "@mui/icons-material/BookmarkOutlined";

import { formatDate, daysUntil } from "../../../../utils/date";
import { formatSalary, formatWorkLocation } from "../../../../utils/format";
import styles from "./JobHeader.module.css";

function JobHeader({ job, saved, onToggleSave, applied, canApply, onApply }) {
    const remainingDays = daysUntil(job.deadline);

    return (
        <div className={styles.header}>
            <div className={styles.badges}>
                {job.is_hot && (
                    <span className={`${styles.badge} ${styles.badgeHot}`}>
                        <WhatshotOutlined className={styles.badgeIcon} />
                        HOT
                    </span>
                )}
            </div>

            <h1 className={styles.title}>{job.title}</h1>

            <div className={styles.salary}>
                <PaymentsOutlined className={styles.salaryIcon} />
                {formatSalary(job.salary)}
            </div>

            <div className={styles.metaRow}>
                <div className={styles.metaItem}>
                    <PlaceOutlined className={styles.metaIcon} />
                    <div>
                        <span className={styles.metaLabel}>Địa điểm</span>
                        <span className={styles.metaValue}>
                            {formatWorkLocation(job.work_location)}
                        </span>
                    </div>
                </div>
                <div className={styles.metaItem}>
                    <WorkHistoryOutlined className={styles.metaIcon} />
                    <div>
                        <span className={styles.metaLabel}>Kinh nghiệm</span>
                        <span className={styles.metaValue}>
                            {job.experience_level || "Không yêu cầu"}
                        </span>
                    </div>
                </div>
                <div className={styles.metaItem}>
                    <EventOutlined className={styles.metaIcon} />
                    <div>
                        <span className={styles.metaLabel}>Hạn ứng tuyển</span>
                        <span className={styles.metaValue}>
                            {formatDate(job.deadline)}
                            {remainingDays !== null && remainingDays >= 0 && (
                                <span className={styles.countdown}> (còn {remainingDays} ngày)</span>
                            )}
                        </span>
                    </div>
                </div>
            </div>

            <div className={styles.actions}>
                <button
                    type="button"
                    className={styles.applyButton}
                    onClick={onApply}
                    disabled={applied || canApply === false}
                >
                    <SendOutlined className={styles.applyIcon} />
                    {applied ? "Đã ứng tuyển" : "Ứng tuyển ngay"}
                </button>
                {canApply === false && !applied && (
                    <span className={styles.metaLabel}>
                        Chỉ tài khoản ứng viên mới ứng tuyển được
                    </span>
                )}
                <button type="button" className={styles.saveButton} onClick={onToggleSave}>
                    {saved ? (
                        <BookmarkOutlined className={styles.saveIcon} />
                    ) : (
                        <BookmarkBorderOutlined className={styles.saveIcon} />
                    )}
                    {saved ? "Đã lưu" : "Lưu tin"}
                </button>
            </div>
        </div>
    );
}

export default JobHeader;
