import styles from "./FilterChip.module.css";

function FilterChip({ label, active = false, onClick, onRemove }) {
    // Dấu × nằm trong chính button chứ không phải button lồng nhau, nên cả chip
    // là vùng bấm để bỏ lọc.
    const isRemovable = Boolean(onRemove);

    return (
        <button
            type="button"
            className={`${styles.chip} ${active ? styles.active : ""}`}
            onClick={isRemovable ? onRemove : onClick}
            aria-label={isRemovable ? `Bỏ lọc ${label}` : undefined}
        >
            {label}
            {isRemovable && (
                <span className={styles.remove} aria-hidden="true">
                    ×
                </span>
            )}
        </button>
    );
}

export default FilterChip;
