import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import BadgeOutlined from "@mui/icons-material/BadgeOutlined";
import PersonOutlined from "@mui/icons-material/PersonOutlined";
import PhoneOutlined from "@mui/icons-material/PhoneOutlined";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import EventOutlined from "@mui/icons-material/EventOutlined";

import JobCard from "../../components/JobCard";
import CompanyInfoCard from "../JobDetail/components/CompanyInfoCard";
import styles from "./CompanyDetail.module.css";

const API_URL = "http://localhost:3000";

function CompanyDetail() {
    const { id } = useParams();

    const [status, setStatus] = useState("loading");
    const [company, setCompany] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [locations, setLocations] = useState([]);

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
        fetch(`${API_URL}/companies/${id}`)
            .then((res) => (res.ok ? res.json() : null))
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
        fetch(`${API_URL}/jobs`)
            .then((res) => res.json())
            .then(setJobs);

        fetch(`${API_URL}/locations`)
            .then((res) => res.json())
            .then(setLocations);
    }, []);

    const locationById = useMemo(
        () => new Map(locations.map((l) => [String(l.id), l])),
        [locations],
    );

    const companyJobs = useMemo(
        () =>
            jobs.filter(
                (job) => String(job.companyId) === String(id) && job.status === "active",
            ),
        [jobs, id],
    );

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
            {company.coverImage && (
                <div
                    className={styles.cover}
                    style={{ backgroundImage: `url(${company.coverImage})` }}
                />
            )}

            <div className={styles.layout}>
                <div className={styles.main}>
                    <h1 className={styles.name}>{company.name}</h1>

                    {company.description && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Giới thiệu công ty</h2>
                            <p className={styles.description}>{company.description}</p>
                        </section>
                    )}

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Thông tin doanh nghiệp</h2>
                        <ul className={styles.detailList}>
                            {company.internationalName && (
                                <li className={styles.detailRow}>
                                    <BadgeOutlined className={styles.detailIcon} />
                                    <span>
                                        Tên quốc tế: <strong>{company.internationalName}</strong>
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
                            {company.phone && (
                                <li className={styles.detailRow}>
                                    <PhoneOutlined className={styles.detailIcon} />
                                    <span>
                                        Điện thoại: <strong>{company.phone}</strong>
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
                            {company.foundedYear && (
                                <li className={styles.detailRow}>
                                    <EventOutlined className={styles.detailIcon} />
                                    <span>
                                        Thành lập năm: <strong>{company.foundedYear}</strong>
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
                                    <JobCard
                                        key={job.id}
                                        job={job}
                                        company={company}
                                        location={locationById.get(String(job.locationId))}
                                    />
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
