import PeopleAltOutlined from "@mui/icons-material/PeopleAltOutlined";
import ScheduleOutlined from "@mui/icons-material/ScheduleOutlined";
import WorkHistoryOutlined from "@mui/icons-material/WorkHistoryOutlined";
import EventOutlined from "@mui/icons-material/EventOutlined";

import { jobTypeLabel } from "../../../../utils/format";
import { formatDate } from "../../../../utils/date";
import styles from "./GeneralInfoPanel.module.css";

function GeneralInfoPanel({ job }) {
    const rows = [
        job.quantity && {
            icon: PeopleAltOutlined,
            label: "Số lượng tuyển",
            value: `${job.quantity} người`,
        },
        { icon: ScheduleOutlined, label: "Hình thức làm việc", value: jobTypeLabel(job.job_type) },
        job.experience_level && {
            icon: WorkHistoryOutlined,
            label: "Kinh nghiệm",
            value: job.experience_level,
        },
        { icon: EventOutlined, label: "Hạn nộp hồ sơ", value: formatDate(job.deadline) },
    ].filter(Boolean);

    return (
        <div className={styles.panel}>
            <h2 className={styles.heading}>Thông tin chung</h2>
            <ul className={styles.list}>
                {rows.map(({ icon: Icon, label, value }) => (
                    <li className={styles.row} key={label}>
                        <Icon className={styles.icon} />
                        <div>
                            <span className={styles.label}>{label}</span>
                            <span className={styles.value}>{value}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GeneralInfoPanel;
