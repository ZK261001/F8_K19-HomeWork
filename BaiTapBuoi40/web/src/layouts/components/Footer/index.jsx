import Facebook from "@mui/icons-material/Facebook";
import YouTube from "@mui/icons-material/YouTube";
import LinkedIn from "@mui/icons-material/LinkedIn";
import Apple from "@mui/icons-material/Apple";
import Android from "@mui/icons-material/Android";
import QrCode2 from "@mui/icons-material/QrCode2";
import ArticleOutlined from "@mui/icons-material/ArticleOutlined";
import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";

import styles from "./Footer.module.css";

const footerColumns = [
    {
        groups: [
            {
                title: "Về TopCV",
                links: [
                    "Giới thiệu",
                    "Góc báo chí",
                    "Tuyển dụng",
                    "Liên hệ",
                    "Hỏi đáp",
                    "Chính sách quyền riêng tư",
                    "Cài đặt Cookie",
                    "Điều khoản dịch vụ",
                ],
            },
            {
                title: "Đối tác",
                links: ["TestCenter", "TopHR", "ViecNgay", "Happy Time"],
            },
        ],
    },
    {
        groups: [
            {
                title: "Hồ sơ và CV",
                links: [
                    "Quản lý CV của bạn",
                    "Hướng dẫn viết CV",
                    "Thư viện CV theo ngành nghề",
                    "Review CV",
                ],
            },
            {
                title: "Khám phá",
                links: [
                    "Ứng dụng di động TopCV",
                    "Tính lương Gross - Net",
                    "Tính lãi suất kép",
                    "Lập kế hoạch tiết kiệm",
                    "Tính bảo hiểm thất nghiệp",
                    "Tính bảo hiểm xã hội một lần",
                    "Trắc nghiệm MBTI",
                    "Trắc nghiệm MI",
                ],
            },
        ],
    },
    {
        groups: [
            {
                title: "Xây dựng sự nghiệp",
                links: [
                    "Việc làm tốt nhất",
                    "Việc làm lương cao",
                    "Việc làm quản lý",
                    "Việc làm IT",
                    "Việc làm Senior",
                    "Việc làm bán thời gian",
                ],
            },
            {
                title: "Quy tắc chung",
                links: [
                    "Điều kiện giao dịch chung",
                    "Giá dịch vụ & Cách thanh toán",
                    "Thông tin về vận chuyển",
                ],
            },
        ],
    },
];

const companyInfoLines = [
    {
        icon: ArticleOutlined,
        content: (
            <>
                Giấy phép đăng ký kinh doanh số: <strong>0107307178</strong> cấp ngày 21/01/2016, thay đổi lần thứ 17
                ngày 03/04/2025 tại Sở Tài chính Thành phố Hà Nội
            </>
        ),
    },
    {
        icon: ArticleOutlined,
        content: (
            <>
                Giấy phép hoạt động dịch vụ việc làm số: <strong>44/2024/SLDTBXH-GP</strong>
            </>
        ),
    },
    {
        icon: LocationOnOutlined,
        content: (
            <>
                Trụ sở HN: Tòa FS - GoldSeason số 47 Nguyễn Tuân, Phường Thanh Xuân, Thành phố Hà Nội, Việt Nam
            </>
        ),
    },
    {
        icon: LocationOnOutlined,
        content: <>Chi nhánh HCM: Tòa nhà Dali, 24C Phan Đăng Lưu, Phường Gia Định, TP HCM</>,
    },
];

const ecosystemCards = [
    { key: "topcv", name: "topcv", desc: "Nền tảng công nghệ tuyển dụng thông minh TopCV.vn" },
    { key: "happytime", name: "happytime", desc: "Nền tảng thiết lập và đánh giá trải nghiệm nhân viên HappyTime.vn" },
    { key: "testcenter", name: "testcenter", desc: "Nền tảng thiết lập và đánh giá năng lực nhân viên TestCenter.vn" },
    { key: "shiring", name: "s-hiring", desc: "Giải pháp quản trị tuyển dụng hiệu suất cao S-Hiring.ai" },
];

function TikTokIcon() {
    return (
        <svg viewBox="0 0 24 24" width="1.8rem" height="1.8rem" fill="currentColor">
            <path d="M16.5 3c.3 1.9 1.5 3.4 3.5 3.9v2.6c-1.3 0-2.5-.4-3.5-1.1v6.4c0 3-2.4 5.2-5.3 5.2-3 0-5.3-2.3-5.3-5.2s2.4-5.2 5.3-5.2c.3 0 .6 0 .9.1v2.7c-.3-.1-.6-.2-.9-.2-1.5 0-2.7 1.2-2.7 2.6 0 1.5 1.2 2.6 2.7 2.6s2.7-1.1 2.7-2.6V3z" />
        </svg>
    );
}

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.top}>
                <div className={styles.brand}>
                    <a href="/" className={styles.logo}>
                        <span className={styles.logoText}>topcv</span>
                        <span className={styles.logoTagline}>Tiếp lợi thế, nối thành công</span>
                    </a>

                    <div className={styles.badges}>
                        <div className={styles.badgeImg}>Google for Startups</div>
                        <div className={styles.dmcaBadge}>DMCA</div>
                    </div>

                    <div className={styles.contact}>
                        <span className={styles.sectionTitle}>Liên hệ</span>
                        <span>
                            Hotline: <strong>1900 068 889</strong> | Nhánh 2 (Giờ hành chính)
                        </span>
                        <span>
                            Email: <strong>hotro@topcv.vn</strong>
                        </span>
                        <span>
                            Zalo hỗ trợ ứng viên: <a href="#">Kết nối ngay →</a>
                        </span>
                        <span>
                            Fanpage: <strong>TopCV Vietnam</strong>
                        </span>
                        <span>
                            LinkedIn: <strong>TopCV Vietnam</strong>
                        </span>
                        <span>
                            Thread: <strong>TopCV Vietnam</strong>
                        </span>
                        <span>
                            Tiktok: <strong>TopCV Vietnam</strong>
                        </span>
                    </div>

                    <div className={styles.appDownload}>
                        <span className={styles.sectionTitle}>Ứng dụng tải xuống</span>
                        <div className={styles.storeBadges}>
                            <a href="#" className={styles.storeBadge}>
                                <Apple className={styles.storeBadgeIcon} />
                                <span className={styles.storeBadgeText}>
                                    <span className={styles.storeBadgeHint}>Download on the</span>
                                    <span className={styles.storeBadgeName}>App Store</span>
                                </span>
                            </a>
                            <a href="#" className={styles.storeBadge}>
                                <Android className={styles.storeBadgeIcon} />
                                <span className={styles.storeBadgeText}>
                                    <span className={styles.storeBadgeHint}>Get it on</span>
                                    <span className={styles.storeBadgeName}>Google Play</span>
                                </span>
                            </a>
                        </div>
                    </div>

                    <div className={styles.social}>
                        <span className={styles.sectionTitle}>Cộng đồng TopCV</span>
                        <div className={styles.socialIcons}>
                            <a href="#" className={styles.socialIcon} aria-label="Facebook">
                                <Facebook />
                            </a>
                            <a href="#" className={styles.socialIcon} aria-label="YouTube">
                                <YouTube />
                            </a>
                            <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
                                <LinkedIn />
                            </a>
                            <a href="#" className={styles.socialIcon} aria-label="TikTok">
                                <TikTokIcon />
                            </a>
                        </div>
                    </div>
                </div>

                {footerColumns.map((column, columnIndex) => (
                    <div className={styles.linkColumn} key={columnIndex}>
                        {column.groups.map((group) => (
                            <div className={styles.linkGroup} key={group.title}>
                                <span className={styles.linkGroupTitle}>{group.title}</span>
                                <div className={styles.linkList}>
                                    {group.links.map((link) => (
                                        <a href="#" className={styles.linkItem} key={link}>
                                            {link}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className={styles.bottom}>
                <div className={styles.bottomInner}>
                    <div className={styles.companyRow}>
                        <div>
                            <div className={styles.companyName}>Công ty Cổ phần TopCV Việt Nam</div>
                            <div className={styles.companyInfo}>
                                {companyInfoLines.map(({ icon: Icon, content }, index) => (
                                    <div className={styles.companyInfoLine} key={index}>
                                        <Icon className={styles.companyInfoIcon} />
                                        <span>{content}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.qrBox}>
                            <div className={styles.qrFrame}>
                                <QrCode2 />
                            </div>
                            <span className={styles.qrCaption}>topcv.com.vn</span>
                        </div>
                    </div>

                    <div className={styles.ecosystem}>
                        <span className={styles.ecosystemTitle}>Hệ sinh thái HR Tech của TopCV</span>
                        <div className={styles.ecosystemCards}>
                            {ecosystemCards.map((card) => (
                                <div className={`${styles.ecosystemCard} ${styles[`ecosystem-${card.key}`]}`} key={card.key}>
                                    <span className={styles.ecosystemLogo}>{card.name}</span>
                                    <span className={styles.ecosystemDesc}>{card.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.copyright}>© 2014-2026 TopCV Vietnam JSC. All rights reserved.</div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
