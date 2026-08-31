import ModalShell from "../ModalShell";
import styles from "./PhoneModal.module.css";

function PhoneModal({ isOpen, dialogue, onClose }) {
    return (
        <ModalShell isOpen={isOpen} tone="sky">
            <div className={styles.iconCircle}>
                <i className="fa-solid fa-phone-volume" />
            </div>
            <h3 className={styles.title}>Gọi điện thoại cho người thân</h3>
            <p className={styles.hint}>Chuyên gia đang hỗ trợ bạn suy nghĩ...</p>
            <div className={styles.dialogueBox}>
                <p className={styles.dialogueText}>{dialogue}</p>
            </div>
            <button type="button" className={styles.closeBtn} onClick={onClose}>
                Cảm ơn người thân!
            </button>
        </ModalShell>
    );
}

export default PhoneModal;
