import { OPTION_LETTERS } from "../../../../../utils/constants.js";
import ModalShell from "../ModalShell";
import styles from "./AudienceModal.module.css";

function AudienceModal({ isOpen, percents, onClose }) {
    return (
        <ModalShell isOpen={isOpen} tone="emerald">
            <div className={styles.iconCircle}>
                <i className="fa-solid fa-chart-simple" />
            </div>
            <h3 className={styles.title}>Ý kiến khán giả trường quay</h3>

            <div className={styles.rows}>
                {OPTION_LETTERS.map((letter, index) => {
                    const percent = percents ? percents[index] : 0;
                    return (
                        <div key={letter}>
                            <div className={styles.rowHeader}>
                                <span>{letter}</span>
                                <span>{percent}%</span>
                            </div>
                            <div className={styles.track}>
                                <div
                                    className={styles.fill}
                                    style={{ width: `${percent}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <button type="button" className={styles.closeBtn} onClick={onClose}>
                Tiếp tục cuộc chơi
            </button>
        </ModalShell>
    );
}

export default AudienceModal;
