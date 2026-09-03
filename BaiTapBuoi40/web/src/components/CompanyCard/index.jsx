import { Link } from "react-router";
import { Avatar } from "@mui/material";
import PeopleAltOutlined from "@mui/icons-material/PeopleAltOutlined";
import CategoryOutlined from "@mui/icons-material/CategoryOutlined";
import PlaceOutlined from "@mui/icons-material/PlaceOutlined";

import { companyStatusLabel } from "../../utils/format";
import styles from "./CompanyCard.module.css";

function CompanyCard({ company }) {
    return (
        <Link to={`/cong-ty/${company.id}`} className={styles.card}>
            <div className={styles.top}>
                <Avatar className={styles.logo} variant="rounded" src={company.logo_url}>
                    {company.company_name?.charAt(0)}
                </Avatar>
            </div>

            <h3 className={styles.title}>{company.company_name}</h3>

            <div className={styles.tags}>
                {company.company_size && (
                    <span className={styles.tag}>
                        <PeopleAltOutlined className={styles.tagIcon} />
                        {company.company_size}
                    </span>
                )}
                {company.category && (
                    <span className={styles.tag}>
                        <CategoryOutlined className={styles.tagIcon} />
                        {company.category}
                    </span>
                )}
                {company.headquarters_address && (
                    <span className={styles.tag}>
                        <PlaceOutlined className={styles.tagIcon} />
                        {company.headquarters_address}
                    </span>
                )}
                {company.status !== "APPROVED" && (
                    <span className={styles.tag}>{companyStatusLabel(company.status)}</span>
                )}
            </div>
        </Link>
    );
}

export default CompanyCard;
