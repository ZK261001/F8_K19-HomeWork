import { Link, useLocation, useNavigate } from "react-router";
import { Avatar, Badge } from "@mui/material";
import KeyboardDoubleArrowRight from "@mui/icons-material/KeyboardDoubleArrowRight";
import NotificationsNoneOutlined from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlined from "@mui/icons-material/ChatBubbleOutlineOutlined";

import { useAuth } from "../../../context/AuthContext";
import styles from "./Header.module.css";

function Header() {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const isJobsActive =
        location.pathname === "/" ||
        location.pathname.startsWith("/viec-lam") ||
        location.pathname.startsWith("/tim-viec-lam");
    const isCompanyActive =
        location.pathname.startsWith("/danh-sach-cong-ty") ||
        location.pathname.startsWith("/cong-ty/");
    const isProfileActive = location.pathname.startsWith("/ho-so");

    function handleLogout() {
        logout();
        navigate("/");
    }

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <Link to="/" className={styles.logo}>
                    <span className={styles.logoText}>topcv</span>
                    <span className={styles.logoTagline}>Tiếp lợi thế, nối thành công</span>
                </Link>

                <ul className={styles.nav}>
                    <li className={styles.navItemWrapper}>
                        <Link
                            to="/"
                            className={`${styles.navLink} ${isJobsActive ? styles.navLinkActive : ""}`}
                        >
                            Việc làm
                        </Link>
                    </li>

                    <li className={styles.navItemWrapper}>
                        <Link
                            to="/danh-sach-cong-ty"
                            className={`${styles.navLink} ${isCompanyActive ? styles.navLinkActive : ""}`}
                        >
                            Công ty
                        </Link>
                    </li>

                    {isAuthenticated && (
                        <li className={styles.navItemWrapper}>
                            <Link
                                to="/ho-so"
                                className={`${styles.navLink} ${isProfileActive ? styles.navLinkActive : ""}`}
                            >
                                Hồ sơ
                            </Link>
                        </li>
                    )}
                </ul>

                <div className={styles.actions}>
                    <Badge
                        badgeContent={user?.unreadNotifications}
                        color="error"
                        className={styles.iconButton}
                    >
                        <NotificationsNoneOutlined className={styles.actionIcon} />
                    </Badge>
                    <ChatBubbleOutlineOutlined className={`${styles.iconButton} ${styles.actionIcon}`} />

                    <span className={styles.divider} />

                    {isAuthenticated ? (
                        <div className={styles.authArea}>
                            <Avatar className={styles.avatar}>{user?.fullName?.charAt(0)}</Avatar>
                            <button type="button" className={styles.logoutButton} onClick={handleLogout}>
                                Đăng xuất
                            </button>
                        </div>
                    ) : (
                        <div className={styles.authArea}>
                            <Link to="/dang-nhap" className={styles.loginLink}>
                                Đăng nhập
                            </Link>
                            <Link to="/dang-ky" className={styles.registerLink}>
                                Đăng ký
                            </Link>
                        </div>
                    )}

                    <span className={styles.divider} />

                    <div className={styles.employer}>
                        <span className={styles.employerHint}>Bạn là nhà tuyển dụng?</span>
                        <Link to="/nha-tuyen-dung" className={styles.employerCta}>
                            Đăng tuyển ngay
                            <KeyboardDoubleArrowRight className={styles.employerCtaIcon} />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
