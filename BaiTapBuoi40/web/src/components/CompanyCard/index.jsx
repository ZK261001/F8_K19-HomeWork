import { Link } from "react-router";
import { Avatar } from "@mui/material";
import PeopleAltOutlined from "@mui/icons-material/PeopleAltOutlined";
import CategoryOutlined from "@mui/icons-material/CategoryOutlined";
import PlaceOutlined from "@mui/icons-material/PlaceOutlined";

import styles from "./CompanyCard.module.css";

function CompanyCard({ company }) {
    return (
        <Link to={`/cong-ty/${company.id}`} className={styles.card}>
            <div className={styles.top}>
                <Avatar className={styles.logo} variant="rounded" src={company.logo}>
                    {company.name?.charAt(0)}
                </Avatar>
            </div>

            <h3 className={styles.title}>{company.name}</h3>

            <div className={styles.tags}>
                {company.scale && (
                    <span className={styles.tag}>
                        <PeopleAltOutlined className={styles.tagIcon} />
                        {company.scale}
                    </span>
                )}
                {company.field && (
                    <span className={styles.tag}>
                        <CategoryOutlined className={styles.tagIcon} />
                        {company.field}
                    </span>
                )}
                {company.address && (
                    <span className={styles.tag}>
                        <PlaceOutlined className={styles.tagIcon} />
                        {company.address}
                    </span>
                )}
            </div>
        </Link>
    );
}

export default CompanyCard;
