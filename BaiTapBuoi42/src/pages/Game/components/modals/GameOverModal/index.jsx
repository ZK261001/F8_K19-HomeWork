import ModalShell from "../ModalShell";
import styles from "./GameOverModal.module.css";

const ICONS = {
    win: "fa-solid fa-crown",
    walkaway: "fa-solid fa-sack-dollar",
    lose: "fa-solid fa-circle-xmark",
};

const TONES = {
    win: "amber",
    walkaway: "sky",
    lose: "rose",
};

function GameOverModal({ result, onRestart }) {
    const isOpen = !!result;

    return (
        <ModalShell isOpen={isOpen} tone={isOpen ? TONES[result.status] : "amber"}>
            {isOpen && (
                <>
                    <div className={`${styles.iconCircle} ${styles[result.status]}`}>
                        <i className={ICONS[result.status]} />
                    </div>
                    <h2 className={styles.title}>{result.title}</h2>
                    <p className={styles.desc}>{result.description}</p>
                    <div className={styles.prizeBox}>
                        <div className={styles.prizeLabel}>Số tiền thưởng của bạn</div>
                        <div className={styles.prizeAmount}>{result.prizeText}</div>
                    </div>
                    <button type="button" className={styles.restartBtn} onClick={onRestart}>
                        THỬ SỨC LẠI <i className="fa-solid fa-rotate-right" />
                    </button>
                </>
            )}
        </ModalShell>
    );
}

export default GameOverModal;
