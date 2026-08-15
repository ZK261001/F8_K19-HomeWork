import { Link } from "react-router";
import styles from "./Breadcrumb.module.css";

function Breadcrumb({ categoryName, jobTitle }) {
    return (
        <nav className={styles.breadcrumb} aria-label="breadcrumb">
            <Link to="/" className={styles.link}>
                Trang chủ
            </Link>
            <span className={styles.separator}>/</span>
            <Link to="/viec-lam" className={styles.link}>
                Việc làm
            </Link>
            {categoryName && (
                <>
                    <span className={styles.separator}>/</span>
                    <Link
                        to={`/viec-lam?keyword=${encodeURIComponent(categoryName)}`}
                        className={styles.link}
                    >
                        Việc làm {categoryName}
                    </Link>
                </>
            )}
            <span className={styles.separator}>/</span>
            <span className={styles.current}>{jobTitle}</span>
        </nav>
    );
}

export default Breadcrumb;
