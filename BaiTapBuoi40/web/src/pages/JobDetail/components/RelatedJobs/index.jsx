import { Link } from "react-router";
import { Avatar } from "@mui/material";

import styles from "./RelatedJobs.module.css";

function RelatedJobs({ jobs, companyById }) {
    if (!jobs.length) return null;

    return (
        <div className={styles.card}>
            <h2 className={styles.heading}>Gợi ý việc làm phù hợp</h2>
            <ul className={styles.list}>
                {jobs.map((job) => {
                    const company = companyById.get(String(job.companyId));
                    return (
                        <li key={job.id}>
                            <Link to={`/viec-lam/${job.slug ?? job.id}`} className={styles.row}>
                                <Avatar className={styles.logo} variant="rounded">
                                    {company?.name?.charAt(0)}
                                </Avatar>
                                <div className={styles.info}>
                                    <span className={styles.title}>{job.title}</span>
                                    <span className={styles.company}>{company?.name}</span>
                                    <span className={styles.salary}>{job.salaryText}</span>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default RelatedJobs;
