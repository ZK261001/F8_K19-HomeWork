import KeyboardDoubleArrowRight from "@mui/icons-material/KeyboardDoubleArrowRight";

import styles from "./TopPromoBanner.module.css";

function TopPromoBanner() {
    return (
        <div className={styles.banner}>
            <div className={styles.inner}>
                <span className={styles.text}>
                    Hãy chia sẻ nhu cầu công việc để nhận gợi ý việc làm tốt nhất
                </span>
                <button type="button" className={styles.cta}>
                    Cập nhật nhu cầu công việc
                    <KeyboardDoubleArrowRight className={styles.ctaIcon} />
                </button>
            </div>
        </div>
    );
}

export default TopPromoBanner;
