import styles from "./QuestionBox.module.css";

function QuestionBox({ levelNumber, questionText }) {
    return (
        <div className={styles.box}>
            <div className={styles.badge}>
                Câu hỏi số <span className={styles.badgeNumber}>{levelNumber}</span>
            </div>
            <p className={styles.text}>{questionText}</p>
        </div>
    );
}

export default QuestionBox;
