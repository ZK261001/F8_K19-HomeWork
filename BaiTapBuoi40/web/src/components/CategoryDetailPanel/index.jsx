import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import WhatshotOutlined from "@mui/icons-material/WhatshotOutlined";
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";

import styles from "./CategoryDetailPanel.module.css";

function CategoryDetailPanel({ category, height }) {
    const scrollRef = useRef(null);
    const [isScrollable, setIsScrollable] = useState(false);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) {
            setIsScrollable(false);
            return;
        }
        setIsScrollable(el.scrollHeight > el.clientHeight + 1);
    }, [category]);

    if (!category) {
        return <div className={styles.card} style={{ height }} />;
    }

    const { popularKeywords = [], groups = [] } = category;

    return (
        <div className={styles.card} style={{ height }}>
            <div className={styles.scrollArea} ref={scrollRef}>
                {popularKeywords.length > 0 && (
                    <div className={styles.section}>
                        <span className={styles.sectionTitle}>Được tìm kiếm nhiều</span>
                        <div className={styles.chipRow}>
                            {popularKeywords.map((keyword) => (
                                <Link
                                    key={keyword}
                                    to={`/viec-lam?keyword=${encodeURIComponent(keyword)}`}
                                    className={styles.hotChip}
                                >
                                    <WhatshotOutlined className={styles.hotChipIcon} />
                                    {keyword}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {groups.map((group) => (
                    <div className={styles.section} key={group.title}>
                        <span className={styles.groupTitle}>{group.title}</span>
                        <div className={styles.chipRow}>
                            {group.jobs.map((jobTitle) => (
                                <Link
                                    key={jobTitle}
                                    to={`/viec-lam?keyword=${encodeURIComponent(jobTitle)}`}
                                    className={styles.jobChip}
                                >
                                    {jobTitle}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {isScrollable && (
                <span className={styles.scrollHint}>
                    Cuộn để xem
                    <KeyboardArrowDownOutlined className={styles.scrollHintIcon} />
                </span>
            )}
        </div>
    );
}

export default CategoryDetailPanel;
