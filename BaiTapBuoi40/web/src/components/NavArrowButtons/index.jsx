import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import styles from "./NavArrowButtons.module.css";

function NavArrowButtons({ onPrev, onNext, disabledPrev = false, disabledNext = false }) {
    return (
        <div className={styles.wrapper}>
            <button
                type="button"
                className={styles.arrowButton}
                onClick={onPrev}
                disabled={disabledPrev}
                aria-label="Trước"
            >
                <KeyboardArrowLeft className={styles.icon} />
            </button>
            <button
                type="button"
                className={styles.arrowButton}
                onClick={onNext}
                disabled={disabledNext}
                aria-label="Sau"
            >
                <KeyboardArrowRight className={styles.icon} />
            </button>
        </div>
    );
}

export default NavArrowButtons;
