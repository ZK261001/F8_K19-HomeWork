import { Link } from "react-router";
import { Avatar } from "@mui/material";

import { formatSalary } from "../../../../utils/format";
import styles from "./RelatedJobs.module.css";

function RelatedJobs({ jobs }) {
    if (!jobs.length) return null;

    return (
        <div className={styles.card}>
            <h2 className={styles.heading}>Gợi ý việc làm phù hợp</h2>
            <ul className={styles.list}>
                {jobs.map((job) => (
                    <li key={job.id}>
                        <Link to={`/viec-lam/${job.slug}`} className={styles.row}>
                            <Avatar className={styles.logo} variant="rounded">
                                {job.company?.company_name?.charAt(0)}
                            </Avatar>
                            <div className={styles.info}>
                                <span className={styles.title}>{job.title}</span>
                                <span className={styles.company}>{job.company?.company_name}</span>
                                <span className={styles.salary}>{formatSalary(job.salary)}</span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RelatedJobs;
