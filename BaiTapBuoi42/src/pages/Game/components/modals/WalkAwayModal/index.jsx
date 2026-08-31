import ModalShell from "../ModalShell";
import styles from "./WalkAwayModal.module.css";

function WalkAwayModal({ isOpen, safeAmountText, onCancel, onConfirm }) {
    return (
        <ModalShell isOpen={isOpen} tone="rose">
            <div className={styles.iconCircle}>
                <i className="fa-solid fa-hand" />
            </div>
            <h3 className={styles.title}>Dừng cuộc chơi?</h3>
            <p className={styles.desc}>
                Bạn có chắc chắn muốn dừng cuộc chơi và mang về số tiền thưởng{" "}
                <b className={styles.amount}>{safeAmountText}</b> không?
            </p>
            <div className={styles.actions}>
                <button type="button" className={styles.secondaryBtn} onClick={onCancel}>
                    Chơi tiếp
                </button>
                <button type="button" className={styles.primaryBtn} onClick={onConfirm}>
                    Chắc chắn dừng
                </button>
            </div>
        </ModalShell>
    );
}

export default WalkAwayModal;
