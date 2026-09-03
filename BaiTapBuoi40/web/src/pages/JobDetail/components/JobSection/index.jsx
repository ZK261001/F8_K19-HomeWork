import styles from "./JobSection.module.css";

function JobSection({ title, html }) {
    if (!html) return null;

    return (
        <div className={styles.section}>
            <h2 className={styles.heading}>{title}</h2>
            <div className={styles.richText} dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    );
}

export default JobSection;
