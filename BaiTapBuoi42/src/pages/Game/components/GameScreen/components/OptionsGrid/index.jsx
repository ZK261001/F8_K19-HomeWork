import { OPTION_LETTERS } from "../../../../../../utils/constants.js";
import styles from "./OptionsGrid.module.css";

function OptionsGrid({
    answers,
    optionStatus,
    hiddenOptionIndices,
    isProcessingAnswer,
    onSelect,
}) {
    return (
        <div className={styles.grid}>
            {answers.map((answerText, index) => {
                const status = optionStatus(index);
                const isHidden = hiddenOptionIndices.includes(index);
                const statusClass = status !== "default" ? styles[status] : "";

                return (
                    <button
                        key={index}
                        type="button"
                        className={`${styles.optionBtn} ${statusClass} ${isHidden ? styles.hidden : ""}`}
                        disabled={isProcessingAnswer || isHidden}
                        onClick={() => onSelect(index)}
                    >
                        <span className={styles.letter}>{OPTION_LETTERS[index]}</span>
                        <span className={styles.answerText}>{answerText}</span>
                    </button>
                );
            })}
        </div>
    );
}

export default OptionsGrid;
