import styles from "./JobSection.module.css";

function parseBulletText(text) {
    if (!text) return { lead: [], items: [] };

    const lines = text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

    const lead = [];
    const items = [];

    lines.forEach((line) => {
        if (line.startsWith("- ")) {
            items.push(line.slice(2));
        } else if (line.startsWith("-")) {
            items.push(line.slice(1).trim());
        } else {
            lead.push(line);
        }
    });

    return { lead, items };
}

function JobSection({ title, text }) {
    const { lead, items } = parseBulletText(text);

    if (!lead.length && !items.length) return null;

    return (
        <div className={styles.section}>
            <h2 className={styles.heading}>{title}</h2>

            {lead.map((line, index) => (
                <p className={styles.leadLine} key={index}>
                    {line}
                </p>
            ))}

            {items.length > 0 && (
                <ul className={styles.list}>
                    {items.map((item, index) => (
                        <li className={styles.listItem} key={index}>
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default JobSection;
