import BusinessCenterOutlined from "@mui/icons-material/BusinessCenterOutlined";
import PeopleAltOutlined from "@mui/icons-material/PeopleAltOutlined";
import ScheduleOutlined from "@mui/icons-material/ScheduleOutlined";
import ApartmentOutlined from "@mui/icons-material/ApartmentOutlined";

import styles from "./GeneralInfoPanel.module.css";

const JOB_TYPE_LABELS = {
    "van-phong": "Làm việc tại văn phòng / Onsite",
    "pho-thong": "Phổ thông",
};

function GeneralInfoPanel({ job }) {
    const rows = [
        { icon: BusinessCenterOutlined, label: "Cấp bậc", value: job.level },
        { icon: PeopleAltOutlined, label: "Số lượng tuyển", value: `${job.quantity} người` },
        { icon: ScheduleOutlined, label: "Hình thức làm việc", value: job.workType },
        {
            icon: ApartmentOutlined,
            label: "Loại hình công việc",
            value: JOB_TYPE_LABELS[job.jobType] ?? job.jobType,
        },
    ];

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
