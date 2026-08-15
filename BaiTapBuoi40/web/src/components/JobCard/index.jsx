import { Link } from "react-router";
import { Avatar } from "@mui/material";
import BookmarkBorderOutlined from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlined from "@mui/icons-material/BookmarkOutlined";
import TrendingUpOutlined from "@mui/icons-material/TrendingUpOutlined";
import WhatshotOutlined from "@mui/icons-material/WhatshotOutlined";
import BoltOutlined from "@mui/icons-material/BoltOutlined";
import PlaceOutlined from "@mui/icons-material/PlaceOutlined";
import PaymentsOutlined from "@mui/icons-material/PaymentsOutlined";

import { useSavedJobs } from "../../context/SavedJobsContext";
import styles from "./JobCard.module.css";

function JobCard({ job, company, location, isTop = false }) {
    const { isSaved, toggleSaved } = useSavedJobs();
    const saved = isSaved(job.id);

    return (
        <Link to={`/viec-lam/${job.slug ?? job.id}`} className={styles.card}>
            <button
                type="button"
                className={styles.saveButton}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleSaved(job.id);
                }}
                aria-label={saved ? "Bỏ lưu việc làm" : "Lưu việc làm"}
            >
                {saved ? (
                    <BookmarkOutlined className={styles.saveIcon} />
                ) : (
                    <BookmarkBorderOutlined className={styles.saveIcon} />
                )}
            </button>

            <div className={styles.top}>
                <Avatar className={styles.logo} variant="rounded">
                    {company?.name?.charAt(0)}
                </Avatar>

                <div className={styles.badges}>
                    {isTop && (
                        <span className={`${styles.badge} ${styles.badgeTop}`}>
                            <TrendingUpOutlined className={styles.badgeIcon} />
                            TOP
                        </span>
                    )}
                    {job.isHot && (
                        <span className={`${styles.badge} ${styles.badgeHot}`}>
                            <WhatshotOutlined className={styles.badgeIcon} />
                            HOT
                        </span>
                    )}
                    {job.isUrgent && (
                        <span className={`${styles.badge} ${styles.badgeUrgent}`}>
                            <BoltOutlined className={styles.badgeIcon} />
                            Gấp
                        </span>
                    )}
                </div>
            </div>

            <h3 className={styles.title}>{job.title}</h3>
            <p className={styles.company}>{company?.name}</p>

            <div className={styles.tags}>
                <span className={styles.tag}>
                    <PaymentsOutlined className={styles.tagIcon} />
                    {job.salaryText}
                </span>
                <span className={styles.tag}>
                    <PlaceOutlined className={styles.tagIcon} />
                    {location?.name}
                </span>
            </div>
        </Link>
    );
}

export default JobCard;
