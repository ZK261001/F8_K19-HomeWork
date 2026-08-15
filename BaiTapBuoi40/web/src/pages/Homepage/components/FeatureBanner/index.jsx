import AccessTimeOutlined from "@mui/icons-material/AccessTimeOutlined";
import VerifiedUserOutlined from "@mui/icons-material/VerifiedUserOutlined";
import FactCheckOutlined from "@mui/icons-material/FactCheckOutlined";
import KeyboardDoubleArrowRight from "@mui/icons-material/KeyboardDoubleArrowRight";
import Diversity2Outlined from "@mui/icons-material/Diversity2Outlined";

import styles from "./FeatureBanner.module.css";

const features = [
    { icon: AccessTimeOutlined, label: "Thời gian linh hoạt" },
    { icon: VerifiedUserOutlined, label: "Nhà tuyển dụng uy tín" },
    { icon: FactCheckOutlined, label: "Ứng tuyển minh bạch" },
];

function FeatureBanner() {
    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <p className={styles.eyebrow}>Cơ hội được đề xuất</p>
                <h2 className={styles.title}>
                    Kiếm thêm <span className={styles.highlight}>thu nhập</span> khi đang tìm việc
                </h2>

                <ul className={styles.features}>
                    {features.map(({ icon: Icon, label }) => (
                        <li key={label} className={styles.feature}>
                            <Icon className={styles.featureIcon} />
                            {label}
                        </li>
                    ))}
                </ul>

                <button type="button" className={styles.cta}>
                    Khám phá ngay
                    <KeyboardDoubleArrowRight className={styles.ctaIcon} />
                </button>
            </div>

            <div className={styles.illustration}>
                <Diversity2Outlined className={styles.illustrationIcon} />
            </div>
        </div>
    );
}

export default FeatureBanner;
