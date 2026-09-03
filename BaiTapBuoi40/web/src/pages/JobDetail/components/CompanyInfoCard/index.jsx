import { Link } from "react-router";
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
            <Link to={`/cong-ty/${company.id}`} className={styles.top}>
                <Avatar className={styles.logo} variant="rounded" src={company.logo_url}>
                    {company.company_name?.charAt(0)}
                </Avatar>
                <h2 className={styles.name}>{company.company_name}</h2>
            </Link>

            <ul className={styles.infoList}>
                {company.company_size && (
                    <li className={styles.infoRow}>
                        <PeopleAltOutlined className={styles.infoIcon} />
                        <span>
                            Quy mô: <strong>{company.company_size}</strong>
                        </span>
                    </li>
                )}
                {company.category && (
                    <li className={styles.infoRow}>
                        <CategoryOutlined className={styles.infoIcon} />
                        <span>
                            Lĩnh vực: <strong>{company.category}</strong>
                        </span>
                    </li>
                )}
                {company.headquarters_address && (
                    <li className={styles.infoRow}>
                        <PlaceOutlined className={styles.infoIcon} />
                        <span>
                            Địa điểm: <strong>{company.headquarters_address}</strong>
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
