import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Avatar, Badge } from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardDoubleArrowRight from "@mui/icons-material/KeyboardDoubleArrowRight";
import NotificationsNoneOutlined from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlined from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import BookmarkBorderOutlined from "@mui/icons-material/BookmarkBorderOutlined";
import AssignmentTurnedInOutlined from "@mui/icons-material/AssignmentTurnedInOutlined";
import ThumbUpOutlined from "@mui/icons-material/ThumbUpOutlined";
import BusinessOutlined from "@mui/icons-material/BusinessOutlined";
import ApartmentOutlined from "@mui/icons-material/ApartmentOutlined";

import { CURRENT_USER_ID } from "../../../utils/currentUser";
import styles from "./Header.module.css";

const API_URL = "http://localhost:3000";

function Header() {
    const [isJobMenuOpen, setIsJobMenuOpen] = useState(false);
    const [positions, setPositions] = useState([]);
    const [fields, setFields] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/categories`)
            .then((res) => res.json())
            .then(setPositions);

        fetch(`${API_URL}/fields`)
            .then((res) => res.json())
            .then(setFields);

        fetch(`${API_URL}/users/${CURRENT_USER_ID}`)
            .then((res) => res.json())
            .then(setCurrentUser);
    }, []);

    const positionsMid = Math.ceil(positions.length / 2);
    const positionColumns = [positions.slice(0, positionsMid), positions.slice(positionsMid)];

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <Link to="/" className={styles.logo}>
                    <span className={styles.logoText}>topcv</span>
                    <span className={styles.logoTagline}>Tiếp lợi thế, nối thành công</span>
                </Link>

                <ul className={styles.nav}>
                    <li
                        className={styles.navItemWrapper}
                        onMouseEnter={() => setIsJobMenuOpen(true)}
                        onMouseLeave={() => setIsJobMenuOpen(false)}
                    >
                        <Link to="/viec-lam" className={styles.navLink}>
                            Việc làm
                            <KeyboardArrowDown className={styles.navIcon} />
                        </Link>

                        {isJobMenuOpen && (
                            <div className={styles.megaMenu}>
                                <div className={styles.megaMenuColumn}>
                                    <div className={styles.megaMenuGroup}>
                                        <span className={styles.megaMenuGroupTitle}>VIỆC LÀM</span>
                                        <ul className={styles.megaMenuList}>
                                            <li>
                                                <Link to="/tim-viec-lam" className={styles.megaMenuLink}>
                                                    <SearchOutlined className={styles.megaMenuLinkIcon} />
                                                    Tìm việc làm
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/viec-lam-da-luu" className={styles.megaMenuLink}>
                                                    <BookmarkBorderOutlined className={styles.megaMenuLinkIcon} />
                                                    Việc làm đã lưu
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/viec-lam-da-ung-tuyen" className={styles.megaMenuLink}>
                                                    <AssignmentTurnedInOutlined className={styles.megaMenuLinkIcon} />
                                                    Việc làm đã ứng tuyển
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/viec-lam-phu-hop" className={styles.megaMenuLink}>
                                                    <ThumbUpOutlined className={styles.megaMenuLinkIcon} />
                                                    Việc làm phù hợp
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className={styles.megaMenuGroup}>
                                        <span className={styles.megaMenuGroupTitle}>CÔNG TY</span>
                                        <ul className={styles.megaMenuList}>
                                            <li>
                                                <Link to="/danh-sach-cong-ty" className={styles.megaMenuLink}>
                                                    <BusinessOutlined className={styles.megaMenuLinkIcon} />
                                                    Danh sách công ty
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/cong-ty-pro" className={styles.megaMenuLink}>
                                                    <ApartmentOutlined className={styles.megaMenuLinkIcon} />
                                                    Công ty
                                                    <span className={styles.proBadge}>Pro</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className={styles.megaMenuColumn}>
                                    <span className={styles.megaMenuGroupTitle}>VIỆC LÀM THEO VỊ TRÍ</span>
                                    <div className={styles.megaMenuColumnWide}>
                                        {positionColumns.map((column, columnIndex) => (
                                            <ul className={styles.megaMenuList} key={columnIndex}>
                                                {column.map((position) => (
                                                    <li key={position.id}>
                                                        <Link
                                                            to={`/viec-lam/${position.slug ?? position.id}`}
                                                            className={styles.megaMenuLink}
                                                        >
                                                            Việc làm {position.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.megaMenuColumn}>
                                    <span className={styles.megaMenuGroupTitle}>VIỆC LÀM THEO LĨNH VỰC</span>
                                    <ul className={styles.megaMenuList}>
                                        {fields.map((field) => (
                                            <li key={field.id}>
                                                <Link to={`/linh-vuc/${field.id}`} className={styles.megaMenuLink}>
                                                    Việc làm {field.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </li>
                </ul>

                <div className={styles.actions}>
                    <Badge
                        badgeContent={currentUser?.unreadNotifications}
                        color="error"
                        className={styles.iconButton}
                    >
                        <NotificationsNoneOutlined className={styles.actionIcon} />
                    </Badge>
                    <ChatBubbleOutlineOutlined className={`${styles.iconButton} ${styles.actionIcon}`} />

                    <span className={styles.divider} />

                    <Avatar className={styles.avatar}>{currentUser?.fullName?.charAt(0)}</Avatar>

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
