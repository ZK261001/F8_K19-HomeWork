import WorkHistoryOutlined from "@mui/icons-material/WorkHistoryOutlined";
import ScheduleOutlined from "@mui/icons-material/ScheduleOutlined";
import PeopleAltOutlined from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlineOutlined from "@mui/icons-material/PersonOutlineOutlined";

import { jobTypeLabel, genderLabel } from "../../../../utils/format";
import styles from "./JobOverviewTags.module.css";

function JobOverviewTags({ job }) {
    const tags = [
        job.experience_level && {
            icon: WorkHistoryOutlined,
            label: `${job.experience_level} kinh nghiệm`,
        },
        { icon: ScheduleOutlined, label: jobTypeLabel(job.job_type) },
        job.quantity && { icon: PeopleAltOutlined, label: `${job.quantity} vị trí cần tuyển` },
    ].filter(Boolean);

    if (job.gender && job.gender !== "NOT_REQUIRED") {
        tags.push({ icon: PersonOutlineOutlined, label: genderLabel(job.gender) });
    }

    return (
        <div className={styles.section}>
            <h2 className={styles.heading}>Tổng quan</h2>
            <div className={styles.tags}>
                {tags.map(({ icon: Icon, label }) => (
                    <span className={styles.tag} key={label}>
                        <Icon className={styles.tagIcon} />
                        {label}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default JobOverviewTags;
