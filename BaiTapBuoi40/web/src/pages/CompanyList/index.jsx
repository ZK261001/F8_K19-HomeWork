import { useEffect, useMemo, useState } from "react";

import CompanyCard from "../../components/CompanyCard";
import { normalizeSearchText } from "../../utils/text";
import styles from "./CompanyList.module.css";

const API_URL = "http://localhost:3000";

function CompanyList() {
    const [companies, setCompanies] = useState([]);
    const [keywordInput, setKeywordInput] = useState("");
    const [keyword, setKeyword] = useState("");
    const [field, setField] = useState("");

    useEffect(() => {
        fetch(`${API_URL}/companies`)
            .then((res) => res.json())
            .then(setCompanies);
    }, []);

    const approvedCompanies = useMemo(
        () => companies.filter((c) => c.status === "approved"),
        [companies],
    );

    const fieldOptions = useMemo(
        () =>
            [...new Set(approvedCompanies.map((c) => c.field).filter(Boolean))].sort((a, b) =>
                a.localeCompare(b),
            ),
        [approvedCompanies],
    );

    const filteredCompanies = useMemo(() => {
        const normalizedKeyword = normalizeSearchText(keyword);

        return approvedCompanies.filter((company) => {
            const matchesKeyword =
                !normalizedKeyword || normalizeSearchText(company.name).includes(normalizedKeyword);
            const matchesField = !field || company.field === field;

            return matchesKeyword && matchesField;
        });
    }, [approvedCompanies, keyword, field]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setKeyword(keywordInput);
    };

    return (
        <div className={styles.page}>
            <h1 className={styles.heading}>Danh sách công ty</h1>
            <p className={styles.subheading}>Các công ty đã được kiểm duyệt hồ sơ trên hệ thống.</p>

            <form className={styles.searchRow} onSubmit={handleSubmit}>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Tìm theo tên công ty"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                />
                <button type="submit" className={styles.searchButton}>
                    Tìm
                </button>
                <select
                    className={styles.fieldSelect}
                    value={field}
                    onChange={(e) => setField(e.target.value)}
                >
                    <option value="">Tất cả nhóm ngành</option>
                    {fieldOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </form>

            <p className={styles.count}>{filteredCompanies.length} công ty</p>

            {filteredCompanies.length > 0 ? (
                <div className={styles.grid}>
                    {filteredCompanies.map((company) => (
                        <CompanyCard key={company.id} company={company} />
                    ))}
                </div>
            ) : (
                <div className={styles.empty}>
                    <p className={styles.emptyTitle}>Không tìm thấy công ty nào</p>
                    <p className={styles.emptyHint}>Thử đổi từ khoá hoặc nhóm ngành.</p>
                </div>
            )}
        </div>
    );
}

export default CompanyList;
