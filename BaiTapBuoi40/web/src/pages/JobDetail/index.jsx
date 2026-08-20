import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";

import { useAuth } from "../../context/AuthContext";
import { useSavedJobs } from "../../context/SavedJobsContext";
import Breadcrumb from "./components/Breadcrumb";
import ShareRail from "./components/ShareRail";
import JobHeader from "./components/JobHeader";
import JobOverviewTags from "./components/JobOverviewTags";
import JobSection from "./components/JobSection";
import GeneralInfoPanel from "./components/GeneralInfoPanel";
import LocationTimePanel from "./components/LocationTimePanel";
import CompanyInfoCard from "./components/CompanyInfoCard";
import RelatedJobs from "./components/RelatedJobs";
import styles from "./JobDetail.module.css";

const API_URL = "http://localhost:3000";
const RELATED_LIMIT = 5;

function JobDetail() {
    const { slug } = useParams();
    const routerLocation = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();

    const [status, setStatus] = useState("loading");
    const [job, setJob] = useState(null);
    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [allJobs, setAllJobs] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [cvs, setCvs] = useState([]);
    const [applied, setApplied] = useState(false);

    const { isSaved, toggleSaved } = useSavedJobs();

    const [prevSlug, setPrevSlug] = useState(slug);
    if (slug !== prevSlug) {
        setPrevSlug(slug);
        setStatus("loading");
        setJob(null);
        setApplied(false);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    useEffect(() => {
        const isNumeric = /^\d+$/.test(slug);
        const jobRequest = isNumeric
            ? fetch(`${API_URL}/jobs/${slug}`).then((res) => (res.ok ? res.json() : null))
            : fetch(`${API_URL}/jobs?slug=${encodeURIComponent(slug)}`)
                  .then((res) => res.json())
                  .then((results) => results[0] ?? null);

        jobRequest
            .then((foundJob) => {
                if (!foundJob) {
                    setStatus("not-found");
                    return;
                }
                setJob(foundJob);
                setStatus("found");
            })
            .catch(() => setStatus("not-found"));
    }, [slug]);

    useEffect(() => {
        fetch(`${API_URL}/companies`)
            .then((res) => res.json())
            .then(setCompanies);
        fetch(`${API_URL}/locations`)
            .then((res) => res.json())
            .then(setLocations);
        fetch(`${API_URL}/categories`)
            .then((res) => res.json())
            .then(setCategories);
        fetch(`${API_URL}/jobs`)
            .then((res) => res.json())
            .then(setAllJobs);
    }, []);

    useEffect(() => {
        if (!isAuthenticated) return;
        fetch(`${API_URL}/cvs?candidateId=${user.id}`)
            .then((res) => res.json())
            .then(setCvs);
    }, [isAuthenticated, user]);

    useEffect(() => {
        if (!isAuthenticated || !job) return;
        fetch(`${API_URL}/applications?candidateId=${user.id}&jobId=${job.id}`)
            .then((res) => res.json())
            .then((results) => {
                if (results.length > 0) setApplied(true);
            });
    }, [job, isAuthenticated, user]);

    const handleApply = () => {
        if (applied || !job) return;

        if (!isAuthenticated) {
            navigate("/dang-nhap", { state: { from: routerLocation } });
            return;
        }

        const latestCv = [...cvs].sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
        )[0];

        fetch(`${API_URL}/applications`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                jobId: Number(job.id),
                candidateId: Number(user.id),
                cvId: latestCv ? Number(latestCv.id) : null,
                status: "pending",
                appliedDate: new Date().toISOString().slice(0, 10),
                note: "",
            }),
        })
            .then((res) => (res.ok ? setApplied(true) : null))
            .catch(() => {});
    };

    const companyById = useMemo(
        () => new Map(companies.map((c) => [String(c.id), c])),
        [companies],
    );
    const locationById = useMemo(
        () => new Map(locations.map((l) => [String(l.id), l])),
        [locations],
    );
    const categoryById = useMemo(
        () => new Map(categories.map((c) => [String(c.id), c])),
        [categories],
    );

    const relatedJobs = useMemo(() => {
        if (!job) return [];
        return allJobs
            .filter(
                (j) =>
                    j.id !== job.id &&
                    j.status === "active" &&
                    String(j.categoryId) === String(job.categoryId),
            )
            .sort((a, b) => b.viewCount - a.viewCount)
            .slice(0, RELATED_LIMIT);
    }, [allJobs, job]);

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
                    Không tìm thấy tin tuyển dụng này.{" "}
                    <Link to="/viec-lam" className={styles.notFoundLink}>
                        Xem các việc làm khác
                    </Link>
                </p>
            </div>
        );
    }

    const location = locationById.get(String(job.locationId));
    const category = categoryById.get(String(job.categoryId));
    const company = companyById.get(String(job.companyId));
    const saved = isSaved(job.id);
    const pageUrl = typeof window !== "undefined" ? window.location.href : "";

    return (
        <div className={styles.page}>
            <Breadcrumb categoryName={category?.name} jobTitle={job.title} />

            <div className={styles.layout}>
                <div className={styles.main}>
                    <div className={styles.contentRow}>
                        <ShareRail url={pageUrl} title={job.title} />

                        <div className={styles.contentMain}>
                            <JobHeader
                                job={job}
                                location={location}
                                saved={saved}
                                onToggleSave={() => toggleSaved(job.id)}
                                applied={applied}
                                onApply={handleApply}
                            />
                            <JobOverviewTags job={job} />
                            <JobSection title="Mô tả công việc" text={job.description} />
                            <JobSection title="Yêu cầu ứng viên" text={job.requirements} />
                            <JobSection title="Quyền lợi ứng viên" text={job.benefits} />
                            <LocationTimePanel
                                location={location}
                                company={company}
                                applied={applied}
                                onApply={handleApply}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.sidebar}>
                    <CompanyInfoCard company={company} />
                    <GeneralInfoPanel job={job} />
                    <RelatedJobs jobs={relatedJobs} companyById={companyById} />
                </div>
            </div>
        </div>
    );
}

export default JobDetail;
