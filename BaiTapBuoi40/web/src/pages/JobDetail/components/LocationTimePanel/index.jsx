import PlaceOutlined from "@mui/icons-material/PlaceOutlined";
import SendOutlined from "@mui/icons-material/SendOutlined";

import styles from "./LocationTimePanel.module.css";

function LocationTimePanel({ job, applied, canApply, onApply }) {
    const locations = job.work_location ?? [];

    return (
        <div className={styles.section}>
            <h2 className={styles.heading}>Địa điểm làm việc</h2>

            {locations.length > 0 ? (
                locations.map((loc, index) => (
                    <div className={styles.row} key={index}>
                        <PlaceOutlined className={styles.icon} />
                        <div>
                            <span className={styles.label}>{loc.city_name}</span>
                            <span className={styles.value}>{loc.address_detail}</span>
                        </div>
                    </div>
                ))
            ) : (
                <div className={styles.row}>
                    <PlaceOutlined className={styles.icon} />
                    <span className={styles.value}>Chưa cập nhật</span>
                </div>
            )}

            <button
                type="button"
                className={styles.applyButton}
                onClick={onApply}
                disabled={applied || canApply === false}
            >
                <SendOutlined className={styles.applyIcon} />
                {applied ? "Đã ứng tuyển" : "Ứng tuyển ngay"}
            </button>
        </div>
    );
}

export default LocationTimePanel;
