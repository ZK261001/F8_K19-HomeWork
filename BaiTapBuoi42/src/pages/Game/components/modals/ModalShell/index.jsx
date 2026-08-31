import styles from "./ModalShell.module.css";

function ModalShell({ isOpen, tone = "amber", children }) {
    if (!isOpen) return null;

    return (
        <div className={styles.backdrop}>
            <div className={`${styles.card} ${styles[tone] ?? styles.amber}`}>
                {children}
            </div>
        </div>
    );
}

export default ModalShell;
