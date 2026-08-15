import { Avatar } from "@mui/material";
import PeopleAltOutlined from "@mui/icons-material/PeopleAltOutlined";
import CategoryOutlined from "@mui/icons-material/CategoryOutlined";
import PlaceOutlined from "@mui/icons-material/PlaceOutlined";
import LaunchOutlined from "@mui/icons-material/LaunchOutlined";

import styles from "./CompanyInfoCard.module.css";

function CompanyInfoCard({ company }) {
    if (!company) return null;

    return (
        <div className={styles.card}>
            <div className={styles.top}>
                <Avatar className={styles.logo} variant="rounded" src={company.logo}>
                    {company.name?.charAt(0)}
                </Avatar>
                <h2 className={styles.name}>{company.name}</h2>
            </div>

            <ul className={styles.infoList}>
                {company.scale && (
                    <li className={styles.infoRow}>
                        <PeopleAltOutlined className={styles.infoIcon} />
                        <span>
                            Quy mô: <strong>{company.scale}</strong>
                        </span>
                    </li>
                )}
                {company.field && (
                    <li className={styles.infoRow}>
                        <CategoryOutlined className={styles.infoIcon} />
                        <span>
                            Lĩnh vực: <strong>{company.field}</strong>
                        </span>
                    </li>
                )}
                {company.address && (
                    <li className={styles.infoRow}>
                        <PlaceOutlined className={styles.infoIcon} />
                        <span>
                            Địa điểm: <strong>{company.address}</strong>
                        </span>
                    </li>
                )}
            </ul>

            {company.website && (
                <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.websiteLink}
                >
                    Xem trang công ty
                    <LaunchOutlined className={styles.websiteLinkIcon} />
                </a>
            )}
        </div>
    );
}

export default CompanyInfoCard;
