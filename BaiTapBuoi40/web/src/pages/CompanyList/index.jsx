import { useEffect, useMemo, useState } from "react";

import CompanyCard from "../../components/CompanyCard";
import styles from "./CompanyList.module.css";

const API_URL = "http://localhost:3000";

function CompanyList() {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/companies`)
            .then((res) => res.json())
            .then(setCompanies);
    }, []);

    const approvedCompanies = useMemo(
        () => companies.filter((c) => c.status === "approved"),
        [companies],
    );

    return (
        <div className={styles.page}>
            <h1 className={styles.heading}>Danh sách công ty ({approvedCompanies.length})</h1>

            {approvedCompanies.length > 0 ? (
                <div className={styles.grid}>
                    {approvedCompanies.map((company) => (
                        <CompanyCard key={company.id} company={company} />
                    ))}
                </div>
            ) : (
                <p className={styles.empty}>Không tìm thấy công ty nào.</p>
            )}
        </div>
    );
}

export default CompanyList;
