import styles from "./FilterChip.module.css";

function FilterChip({ label, active = false, onClick }) {
    return (
        <button
            type="button"
            className={`${styles.chip} ${active ? styles.active : ""}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
}

export default FilterChip;
