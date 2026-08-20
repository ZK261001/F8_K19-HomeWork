import { useEffect, useMemo, useState } from "react";
import { Avatar } from "@mui/material";
import PersonOutlined from "@mui/icons-material/PersonOutlined";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import PhoneOutlined from "@mui/icons-material/PhoneOutlined";
import BadgeOutlined from "@mui/icons-material/BadgeOutlined";
import EventOutlined from "@mui/icons-material/EventOutlined";

import { useAuth } from "../../context/AuthContext";
import { formatDate } from "../../utils/date";
import JobCard from "../../components/JobCard";
import styles from "./Profile.module.css";

const API_URL = "http://localhost:3000";

const ROLE_LABELS = {
    candidate: "Ứng viên",
    recruiter: "Nhà tuyển dụng",
    admin: "Quản trị viên",
};

const APPLICATION_STATUS_LABELS = {
    pending: "Đang chờ duyệt",
    viewed: "Nhà tuyển dụng đã xem",
    accepted: "Được chấp nhận",
};

function Profile() {
    const { user } = useAuth();

    const [applications, setApplications] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        if (!user) return;
        fetch(`${API_URL}/applications?candidateId=${user.id}`)
            .then((res) => res.json())
            .then(setApplications);
        fetch(`${API_URL}/jobs`)
            .then((res) => res.json())
            .then(setJobs);
        fetch(`${API_URL}/companies`)
            .then((res) => res.json())
            .then(setCompanies);
        fetch(`${API_URL}/locations`)
            .then((res) => res.json())
            .then(setLocations);
    }, [user]);

    const jobById = useMemo(() => new Map(jobs.map((j) => [String(j.id), j])), [jobs]);
    const companyById = useMemo(
        () => new Map(companies.map((c) => [String(c.id), c])),
        [companies],
    );
    const locationById = useMemo(
        () => new Map(locations.map((l) => [String(l.id), l])),
        [locations],
    );

    const appliedJobs = useMemo(() => {
        return applications
            .map((application) => ({
                application,
                job: jobById.get(String(application.jobId)),
            }))
            .filter((entry) => Boolean(entry.job))
            .sort(
                (a, b) => new Date(b.application.appliedDate) - new Date(a.application.appliedDate),
            );
    }, [applications, jobById]);

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.top}>
                    <Avatar className={styles.avatar} src={user?.avatar}>
                        {user?.fullName?.charAt(0)}
                    </Avatar>
                    <h1 className={styles.name}>{user?.fullName}</h1>
                </div>

                <ul className={styles.infoList}>
                    <li className={styles.infoRow}>
                        <PersonOutlined className={styles.infoIcon} />
                        <span>
                            Họ và tên: <strong>{user?.fullName}</strong>
                        </span>
                    </li>
                    <li className={styles.infoRow}>
                        <EmailOutlined className={styles.infoIcon} />
                        <span>
                            Email: <strong>{user?.email}</strong>
                        </span>
                    </li>
                    <li className={styles.infoRow}>
                        <PhoneOutlined className={styles.infoIcon} />
                        <span>
                            Số điện thoại: <strong>{user?.phone || "Chưa cập nhật"}</strong>
                        </span>
                    </li>
                    <li className={styles.infoRow}>
                        <BadgeOutlined className={styles.infoIcon} />
                        <span>
                            Vai trò: <strong>{ROLE_LABELS[user?.role] ?? user?.role}</strong>
                        </span>
                    </li>
                    {user?.createdAt && (
                        <li className={styles.infoRow}>
                            <EventOutlined className={styles.infoIcon} />
                            <span>
                                Ngày tham gia: <strong>{formatDate(user.createdAt)}</strong>
                            </span>
                        </li>
                    )}
                </ul>
            </div>

            <div className={styles.appliedSection}>
                <h2 className={styles.appliedTitle}>Việc làm đã ứng tuyển</h2>

                {appliedJobs.length === 0 ? (
                    <p className={styles.appliedEmpty}>Bạn chưa ứng tuyển việc làm nào.</p>
                ) : (
                    <div className={styles.appliedGrid}>
                        {appliedJobs.map(({ application, job }) => (
                            <div key={application.id} className={styles.appliedItem}>
                                <span className={styles.appliedStatus}>
                                    {APPLICATION_STATUS_LABELS[application.status] ?? application.status}
                                    {" · "}
                                    {formatDate(application.appliedDate)}
                                </span>
                                <JobCard
                                    job={job}
                                    company={companyById.get(String(job.companyId))}
                                    location={locationById.get(String(job.locationId))}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
