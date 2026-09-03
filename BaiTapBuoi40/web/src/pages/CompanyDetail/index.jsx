import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import BadgeOutlined from "@mui/icons-material/BadgeOutlined";
import PersonOutlined from "@mui/icons-material/PersonOutlined";
import PhoneOutlined from "@mui/icons-material/PhoneOutlined";
import EmailOutlined from "@mui/icons-material/EmailOutlined";

import JobCard from "../../components/JobCard";
import CompanyInfoCard from "../JobDetail/components/CompanyInfoCard";
import { findCompanyById } from "../../api/companies";
import { fetchAllJobsByCompanyId } from "../../api/jobs";
import styles from "./CompanyDetail.module.css";

function CompanyDetail() {
    const { id } = useParams();

    const [status, setStatus] = useState("loading");
    const [company, setCompany] = useState(null);
    const [jobs, setJobs] = useState([]);

    const [prevId, setPrevId] = useState(id);
    if (id !== prevId) {
        setPrevId(id);
        setStatus("loading");
        setCompany(null);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        findCompanyById(id)
            .then((found) => {
                if (!found) {
                    setStatus("not-found");
                    return;
                }
                setCompany(found);
                setStatus("found");
            })
            .catch(() => setStatus("not-found"));
    }, [id]);

    useEffect(() => {
        fetchAllJobsByCompanyId(id).then(setJobs);
    }, [id]);

    const companyJobs = jobs;

    if (status === "loading") {
        return (
            <div className={styles.page}>
                <p className={styles.loading}>Đang tải...</p>
            </div>
        );
    }

    if (status === "not-found") {
        return (
            <div className={styles.page}>
                <p className={styles.notFound}>
                    Không tìm thấy công ty này.{" "}
                    <Link to="/danh-sach-cong-ty" className={styles.notFoundLink}>
                        Xem danh sách công ty khác
                    </Link>
                </p>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.layout}>
                <div className={styles.main}>
                    <h1 className={styles.name}>{company.company_name}</h1>

                    {company.description_html && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Giới thiệu công ty</h2>
                            <div
                                className={styles.description}
                                dangerouslySetInnerHTML={{ __html: company.description_html }}
                            />
                        </section>
                    )}

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Thông tin doanh nghiệp</h2>
                        <ul className={styles.detailList}>
                            {company.international_name && (
                                <li className={styles.detailRow}>
                                    <BadgeOutlined className={styles.detailIcon} />
                                    <span>
                                        Tên quốc tế: <strong>{company.international_name}</strong>
                                    </span>
                                </li>
                            )}
                            {company.director && (
                                <li className={styles.detailRow}>
                                    <PersonOutlined className={styles.detailIcon} />
                                    <span>
                                        Người đại diện: <strong>{company.director}</strong>
                                    </span>
                                </li>
                            )}
                            {company.phone_number && (
                                <li className={styles.detailRow}>
                                    <PhoneOutlined className={styles.detailIcon} />
                                    <span>
                                        Điện thoại: <strong>{company.phone_number}</strong>
                                    </span>
                                </li>
                            )}
                            {company.email && (
                                <li className={styles.detailRow}>
                                    <EmailOutlined className={styles.detailIcon} />
                                    <span>
                                        Email: <strong>{company.email}</strong>
                                    </span>
                                </li>
                            )}
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            Việc làm đang tuyển ({companyJobs.length})
                        </h2>
                        {companyJobs.length > 0 ? (
                            <div className={styles.grid}>
                                {companyJobs.map((job) => (
                                    <JobCard key={job.id} job={job} company={company} />
                                ))}
                            </div>
                        ) : (
                            <p className={styles.empty}>
                                Công ty hiện chưa có tin tuyển dụng nào đang mở.
                            </p>
                        )}
                    </section>
                </div>

                <div className={styles.sidebar}>
                    <CompanyInfoCard company={company} />
                </div>
            </div>
        </div>
    );
}

export default CompanyDetail;
