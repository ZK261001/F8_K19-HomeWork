import { forwardRef, useState } from "react";
import { Link } from "react-router";
import ChevronRightOutlined from "@mui/icons-material/ChevronRightOutlined";

import NavArrowButtons from "../../../../components/NavArrowButtons";
import styles from "./CategoryList.module.css";

const PAGE_SIZE = 6;

const CategoryList = forwardRef(function CategoryList(
    { categories = [], activeId, onHoverCategory },
    ref,
) {
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(categories.length / PAGE_SIZE));
    const start = (page - 1) * PAGE_SIZE;
    const visibleCategories = categories.slice(start, start + PAGE_SIZE);
    const placeholderCount = totalPages > 1 ? PAGE_SIZE - visibleCategories.length : 0;

    return (
        <div className={styles.card} ref={ref}>
            <ul className={styles.list}>
                {visibleCategories.map((category) => (
                    <li key={category.id}>
                        <Link
                            to={`/linh-vuc/${category.slug ?? category.id}`}
                            className={`${styles.item} ${category.id === activeId ? styles.itemActive : ""}`}
                            onMouseEnter={() => onHoverCategory?.(category.id)}
                        >
                            {category.name}
                            <ChevronRightOutlined className={styles.itemIcon} />
                        </Link>
                    </li>
                ))}
                {Array.from({ length: placeholderCount }).map((_, i) => (
                    <li key={`placeholder-${i}`} aria-hidden="true">
                        <div className={`${styles.item} ${styles.itemPlaceholder}`} />
                    </li>
                ))}
            </ul>

            {categories.length > PAGE_SIZE && (
                <div className={styles.pager}>
                    <span className={styles.pagerLabel}>
                        {page}/{totalPages}
                    </span>
                    <NavArrowButtons
                        disabledPrev={page <= 1}
                        disabledNext={page >= totalPages}
                        onPrev={() => setPage((p) => p - 1)}
                        onNext={() => setPage((p) => p + 1)}
                    />
                </div>
            )}
        </div>
    );
});

export default CategoryList;
