import { Link } from "react-router";
import ChevronRightOutlined from "@mui/icons-material/ChevronRightOutlined";

import styles from "./CategoryDetailPanel.module.css";

function CategoryDetailPanel({ category, height }) {
    if (!category) {
        return <div className={styles.card} style={{ height }} />;
    }

    return (
        <div className={styles.card} style={{ height }}>
            <div className={styles.section}>
                <span className={styles.sectionTitle}>{category.name}</span>
                <p>Xem tất cả tin tuyển dụng thuộc lĩnh vực {category.name}.</p>
                <Link to={`/linh-vuc/${category.slug}`} className={styles.hotChip}>
                    Xem việc làm {category.name}
                    <ChevronRightOutlined className={styles.hotChipIcon} />
                </Link>
            </div>
        </div>
    );
}

export default CategoryDetailPanel;
