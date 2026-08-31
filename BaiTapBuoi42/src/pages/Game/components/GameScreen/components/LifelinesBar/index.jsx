import styles from "./LifelinesBar.module.css";

const LIFELINES = [
    { type: "5050", icon: "fa-solid fa-percent", label: "50:50", tone: "fifty" },
    { type: "phone", icon: "fa-solid fa-phone", label: "Người thân", tone: "phone" },
    {
        type: "audience",
        icon: "fa-solid fa-users",
        label: "Khán giả",
        tone: "audience",
    },
    {
        type: "switch",
        icon: "fa-solid fa-arrows-rotate",
        label: "Đổi câu hỏi",
        tone: "switch",
    },
];

function LifelinesBar({ usedLifelines, isProcessingAnswer, onUseLifeline }) {
    return (
        <div className={styles.bar}>
            {LIFELINES.map(({ type, icon, label, tone }) => (
                <button
                    key={type}
                    type="button"
                    className={`${styles.lifelineBtn} ${styles[tone]}`}
                    disabled={usedLifelines[type] || isProcessingAnswer}
                    onClick={() => onUseLifeline(type)}
                >
                    <i className={`${icon} ${styles.icon}`} />
                    <span>{label}</span>
                </button>
            ))}
        </div>
    );
}

export default LifelinesBar;
