import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";

import { useAuth } from "../../context/AuthContext";
import { useSavedJobs } from "../../context/SavedJobsContext";
import { getJobBySlug, listJobs, applyToJob } from "../../api/jobs";
import { createCv } from "../../api/candidate";
import {
    getStoredCvId,
    setStoredCvId,
    hasAppliedToJob,
    addAppliedJob,
} from "../../utils/applyStorage";
import ApplyCvModal from "../../components/ApplyCvModal";
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

const RELATED_LIMIT = 5;

function JobDetail() {
    const { slug } = useParams();
    const routerLocation = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();

    const [status, setStatus] = useState("loading");
    const [job, setJob] = useState(null);
    const [allJobs, setAllJobs] = useState([]);
    const [applied, setApplied] = useState(false);
    const [isCvModalOpen, setIsCvModalOpen] = useState(false);
    const [applyError, setApplyError] = useState("");

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
        getJobBySlug(slug)
            .then((foundJob) => {
                setJob(foundJob);
                setStatus("found");
                if (isAuthenticated && hasAppliedToJob(user.id, foundJob.slug)) {
                    setApplied(true);
                }
            })
            .catch(() => setStatus("not-found"));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    useEffect(() => {
        listJobs({ page: 1 }).then(({ data }) => setAllJobs(data));
    }, []);

    async function submitApplication(cvId) {
        setApplyError("");
        try {
            await applyToJob(job.id, { cvId, coverLetter: "" });
            setApplied(true);
            addAppliedJob(user.id, {
                jobSlug: job.slug,
                jobTitle: job.title,
                companyName: job.company?.company_name,
            });
        } catch (error) {
            setApplyError(error.message || "Ứng tuyển thất bại, vui lòng thử lại");
        }
    }

    const handleApply = () => {
        if (applied || !job) return;

        if (!isAuthenticated) {
            navigate("/dang-nhap", { state: { from: routerLocation } });
            return;
        }

        if (user.role !== "CANDIDATE") return;

        const storedCvId = getStoredCvId(user.id);
        if (storedCvId) {
            submitApplication(storedCvId);
        } else {
            setIsCvModalOpen(true);
        }
    };

    async function handleCreateCvAndApply(cvForm) {
        const { cv_id } = await createCv(cvForm);
        setStoredCvId(user.id, cv_id);
        setIsCvModalOpen(false);
        await submitApplication(cv_id);
    }

    const relatedJobs = useMemo(() => {
        if (!job) return [];
        return allJobs
            .filter((j) => j.id !== job.id && j.category === job.category)
            .sort((a, b) => Number(b.is_hot) - Number(a.is_hot))
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

    const saved = isSaved(job.id);
    const canApply = !isAuthenticated || user.role === "CANDIDATE";
    const pageUrl = typeof window !== "undefined" ? window.location.href : "";

    return (
        <div className={styles.page}>
            <Breadcrumb categoryName={job.category} jobTitle={job.title} />

            <div className={styles.layout}>
                <div className={styles.main}>
                    <div className={styles.contentRow}>
                        <ShareRail url={pageUrl} title={job.title} />

                        <div className={styles.contentMain}>
                            {applyError && <p className={styles.notFound}>{applyError}</p>}
                            <JobHeader
                                job={job}
                                saved={saved}
                                onToggleSave={() => toggleSaved(job.id)}
                                applied={applied}
                                canApply={canApply}
                                onApply={handleApply}
                            />
                            <JobOverviewTags job={job} />
                            <JobSection title="Mô tả công việc" html={job.description_html} />
                            <JobSection title="Yêu cầu ứng viên" html={job.requirements_html} />
                            <JobSection title="Quyền lợi ứng viên" html={job.benefits_html} />
                            <LocationTimePanel
                                job={job}
                                applied={applied}
                                canApply={canApply}
                                onApply={handleApply}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.sidebar}>
                    <CompanyInfoCard company={job.company} />
                    <GeneralInfoPanel job={job} />
                    <RelatedJobs jobs={relatedJobs} />
                </div>
            </div>

            {isCvModalOpen && (
                <ApplyCvModal
                    defaultEmail={user?.email}
                    onClose={() => setIsCvModalOpen(false)}
                    onSubmit={handleCreateCvAndApply}
                />
            )}
        </div>
    );
}

export default JobDetail;
