import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import styles from "./Pagination.module.css";

function Pagination({ currentPage, totalPages, onPageChange, label }) {
    if (totalPages <= 0) return null;

    const text = label
        ? label.replace("{current}", currentPage).replace("{total}", totalPages)
        : `${currentPage} / ${totalPages}`;

    return (
        <div className={styles.pagination}>
            <button
                type="button"
                className={styles.arrowButton}
                disabled={currentPage <= 1}
                onClick={() => onPageChange(currentPage - 1)}
                aria-label="Trang trước"
            >
                <KeyboardArrowLeft className={styles.icon} />
            </button>
            <span className={styles.label}>{text}</span>
            <button
                type="button"
                className={styles.arrowButton}
                disabled={currentPage >= totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                aria-label="Trang sau"
            >
                <KeyboardArrowRight className={styles.icon} />
            </button>
        </div>
    );
}

export default Pagination;
