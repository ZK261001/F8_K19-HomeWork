import { useEffect, useState } from "react";
import { Link } from "react-router";

import Pagination from "../../components/Pagination";
import { listCompanies } from "../../api/companies";
import { companyStatusLabel } from "../../utils/format";
import styles from "./AdminCompanies.module.css";

const PAGE_SIZE = 20;

function AdminCompanies() {
    const [companies, setCompanies] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [keywordInput, setKeywordInput] = useState("");
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        listCompanies({ page: currentPage, keyword: keyword || undefined }).then(
            ({ data, total: totalCount }) => {
                setCompanies(data);
                setTotal(totalCount);
            },
        );
    }, [currentPage, keyword]);

    function handleSubmit(event) {
        event.preventDefault();
        setCurrentPage(1);
        setKeyword(keywordInput.trim());
    }

    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    return (
        <div className={styles.page}>
            <h1 className={styles.heading}>Quản trị công ty</h1>
            <p className={styles.subheading}>
                Thông tin đăng ký của các công ty trên hệ thống. Bảng chỉ để xem — API hiện chưa
                có endpoint duyệt hoặc từ chối công ty.
            </p>

            <form className={styles.searchRow} onSubmit={handleSubmit}>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Tìm theo tên công ty"
                    value={keywordInput}
                    onChange={(event) => setKeywordInput(event.target.value)}
                />
                <button type="submit" className={styles.searchButton}>
                    Tìm
                </button>
            </form>

            <p className={styles.count}>{total} công ty</p>

            {companies.length > 0 ? (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.th}>Mã số thuế</th>
                                <th className={styles.th}>Tên công ty</th>
                                <th className={styles.th}>Tên quốc tế</th>
                                <th className={styles.th}>Người đại diện</th>
                                <th className={styles.th}>Điện thoại</th>
                                <th className={styles.th}>Email</th>
                                <th className={styles.th}>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map((company) => (
                                <tr key={company.id} className={styles.row}>
                                    <td className={styles.td}>{company.tax_code}</td>
                                    <td className={styles.td}>
                                        <Link
                                            to={`/cong-ty/${company.id}`}
                                            className={styles.companyLink}
                                        >
                                            {company.company_name}
                                        </Link>
                                    </td>
                                    <td className={styles.td}>{company.international_name || "—"}</td>
                                    <td className={styles.td}>{company.director || "—"}</td>
                                    <td className={styles.td}>{company.phone_number || "—"}</td>
                                    <td className={styles.td}>{company.email}</td>
                                    <td className={styles.td}>
                                        <span
                                            className={`${styles.status} ${
                                                styles[`status${company.status}`] ?? ""
                                            }`}
                                        >
                                            {companyStatusLabel(company.status)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className={styles.empty}>Không tìm thấy công ty nào.</p>
            )}

            {total > 0 && (
                <div className={styles.paginationWrapper}>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        label="{current} / {total} trang"
                    />
                </div>
            )}
        </div>
    );
}

export default AdminCompanies;
