import { Link, useLocation } from "react-router";

import styles from "./EmployerTabs.module.css";

const TABS = [
    { to: "/nha-tuyen-dung", label: "Đăng tin mới" },
    { to: "/nha-tuyen-dung/tin-da-dang", label: "Tin đã đăng" },
];

function EmployerTabs() {
    const location = useLocation();

    return (
        <nav className={styles.tabs} aria-label="Khu vực nhà tuyển dụng">
            {TABS.map((tab) => {
                // So khớp chính xác: dùng startsWith thì "/tin-da-dang" sẽ làm
                // sáng luôn tab "Đăng tin mới".
                const isActive = location.pathname === tab.to;
                return (
                    <Link
                        key={tab.to}
                        to={tab.to}
                        className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
                        aria-current={isActive ? "page" : undefined}
                    >
                        {tab.label}
                    </Link>
                );
            })}
        </nav>
    );
}

export default EmployerTabs;
