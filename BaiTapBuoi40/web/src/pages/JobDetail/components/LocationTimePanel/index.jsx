import PlaceOutlined from "@mui/icons-material/PlaceOutlined";
import SendOutlined from "@mui/icons-material/SendOutlined";

import styles from "./LocationTimePanel.module.css";

function LocationTimePanel({ location, company, applied, onApply }) {
    return (
        <div className={styles.section}>
            <h2 className={styles.heading}>Địa điểm và thời gian</h2>

            <div className={styles.row}>
                <PlaceOutlined className={styles.icon} />
                <div>
                    <span className={styles.label}>Địa điểm làm việc</span>
                    <span className={styles.value}>
                        {company?.address ?? location?.name}
                        {company?.address && location?.name ? ` (${location.name})` : ""}
                    </span>
                </div>
            </div>

            <button
                type="button"
                className={styles.applyButton}
                onClick={onApply}
                disabled={applied}
            >
                <SendOutlined className={styles.applyIcon} />
                {applied ? "Đã ứng tuyển" : "Ứng tuyển ngay"}
            </button>
        </div>
    );
}

export default LocationTimePanel;
