import styles from "./PillTabs.module.css";

function PillTabs({ tabs, activeKey, onChange }) {
    return (
        <div className={styles.tabs}>
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    type="button"
                    className={`${styles.tab} ${tab.key === activeKey ? styles.active : ""}`}
                    onClick={() => onChange(tab.key)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}

export default PillTabs;
