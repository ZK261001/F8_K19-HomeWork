import CloseOutlined from "@mui/icons-material/CloseOutlined";

import styles from "./TipBanner.module.css";

function TipBanner({ onDismiss }) {
    return (
        <div className={styles.banner}>
            <span className={styles.text}>
                💡 Gợi ý: Di chuột vào tiêu đề việc làm để xem thêm thông tin chi tiết
            </span>
            <button
                type="button"
                className={styles.closeButton}
                onClick={onDismiss}
                aria-label="Đóng gợi ý"
            >
                <CloseOutlined className={styles.closeIcon} />
            </button>
        </div>
    );
}

export default TipBanner;
