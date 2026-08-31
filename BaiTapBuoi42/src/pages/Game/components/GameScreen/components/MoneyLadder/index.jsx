import { MILESTONE_INDICES, PRIZE_LADDER } from "../../../../../../data/prizeLadder.js";
import styles from "./MoneyLadder.module.css";

function MoneyLadder({ currentLevel }) {
    const rows = [];
    for (let i = 14; i >= 0; i--) {
        const isCurrent = i === currentLevel;
        const isPassed = i < currentLevel;
        const isMilestone = MILESTONE_INDICES.includes(i);

        let rowClass = styles.row;
        if (isCurrent) {
            rowClass = `${styles.row} ${styles.current}`;
        } else if (isPassed) {
            rowClass = `${styles.row} ${styles.passed}`;
        } else if (isMilestone) {
            rowClass = `${styles.row} ${styles.milestone}`;
        }

        rows.push(
            <div key={i} className={rowClass}>
                <span className={styles.rowLabel}>Câu {i + 1}</span>
                <span>{PRIZE_LADDER[i]} đ</span>
            </div>,
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.headerLabel}>Thang tiền thưởng</span>
                <i className={`fa-solid fa-ranking-star ${styles.headerIcon}`} />
            </div>
            <div className={styles.list}>{rows}</div>
        </div>
    );
}

export default MoneyLadder;
