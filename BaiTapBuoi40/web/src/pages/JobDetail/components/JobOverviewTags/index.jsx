import WorkHistoryOutlined from "@mui/icons-material/WorkHistoryOutlined";
import BusinessCenterOutlined from "@mui/icons-material/BusinessCenterOutlined";
import ScheduleOutlined from "@mui/icons-material/ScheduleOutlined";
import PeopleAltOutlined from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlineOutlined from "@mui/icons-material/PersonOutlineOutlined";

import styles from "./JobOverviewTags.module.css";

function JobOverviewTags({ job }) {
    const tags = [
        { icon: WorkHistoryOutlined, label: `${job.experience} kinh nghiệm` },
        { icon: BusinessCenterOutlined, label: job.level },
        { icon: ScheduleOutlined, label: job.workType },
        { icon: PeopleAltOutlined, label: `${job.quantity} vị trí cần tuyển` },
    ];

    if (job.gender && job.gender !== "Không yêu cầu") {
        tags.push({ icon: PersonOutlineOutlined, label: job.gender });
    }

    return (
        <div className={styles.section}>
            <h2 className={styles.heading}>Tổng quan</h2>
            <div className={styles.tags}>
                {tags
                    .filter((tag) => tag.label)
                    .map(({ icon: Icon, label }) => (
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
