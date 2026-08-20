import { Link } from "react-router";

import styles from "./Forbidden.module.css";

function Forbidden() {
    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h1 className={styles.title}>403</h1>
                <p className={styles.message}>Bạn không có quyền truy cập trang này.</p>
                <Link to="/" className={styles.homeLink}>
                    Về trang chủ
                </Link>
            </div>
        </div>
    );
}

export default Forbidden;
