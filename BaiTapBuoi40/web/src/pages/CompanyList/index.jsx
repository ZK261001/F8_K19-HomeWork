import { useEffect, useMemo, useState } from "react";

import CompanyCard from "../../components/CompanyCard";
import { listCompanies } from "../../api/companies";
import styles from "./CompanyList.module.css";

function CompanyList() {
    const [companies, setCompanies] = useState([]);
    const [total, setTotal] = useState(0);
    const [keywordInput, setKeywordInput] = useState("");
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        listCompanies({ page: 1, keyword: keyword || undefined }).then(({ data, total: t }) => {
            setCompanies(data);
            setTotal(t);
        });
    }, [keyword]);

    const categoryOptions = useMemo(
        () => [...new Set(companies.map((c) => c.category).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
        [companies],
    );

    // API không có filter theo lĩnh vực công ty ở query string, nên chỉ lọc
    // thêm trên trang dữ liệu hiện có.
    const filteredCompanies = useMemo(
        () => companies.filter((company) => !category || company.category === category),
        [companies, category],
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setKeyword(keywordInput);
    };

    return (
        <div className={styles.page}>
            <h1 className={styles.heading}>Danh sách công ty</h1>
            <p className={styles.subheading}>Các công ty đang tuyển dụng trên hệ thống.</p>

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
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Tất cả nhóm ngành</option>
                    {categoryOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </form>

            <p className={styles.count}>{total} công ty</p>

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
