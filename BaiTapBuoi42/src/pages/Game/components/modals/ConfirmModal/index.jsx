import ModalShell from "../ModalShell";
import styles from "./ConfirmModal.module.css";

function ConfirmModal({ isOpen, onCancel, onConfirm }) {
    return (
        <ModalShell isOpen={isOpen} tone="amber">
            <div className={styles.iconCircle}>
                <i className="fa-solid fa-question" />
            </div>
            <h3 className={styles.title}>Xác nhận lựa chọn</h3>
            <p className={styles.desc}>
                Bạn có chắc chắn muốn chọn đáp án này là câu trả lời cuối cùng không?
            </p>
            <div className={styles.actions}>
                <button type="button" className={styles.secondaryBtn} onClick={onCancel}>
                    Thử chọn lại
                </button>
                <button type="button" className={styles.primaryBtn} onClick={onConfirm}>
                    Chốt đáp án!
                </button>
            </div>
        </ModalShell>
    );
}

export default ConfirmModal;
