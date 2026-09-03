import { useMemo } from "react";
import { Link } from "react-router";
import { Avatar } from "@mui/material";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import RestoreOutlined from "@mui/icons-material/RestoreOutlined";
import TrendingUpOutlined from "@mui/icons-material/TrendingUpOutlined";

import { normalizeSearchText } from "../../../utils/text";
import { filterJobsByKeyword, getPopularKeywords, getTopJobs } from "../../../utils/jobSearch";
import { formatSalary } from "../../../utils/format";
import styles from "./SearchOverlay.module.css";

const SUGGESTED_LIMIT = 6;
const RELATED_LIMIT = 4;
const JOB_LIMIT = 4;
const INTERESTING_JOB_LIMIT = 5;
const POPULAR_LIMIT = 4;

function SearchOverlay({
    keyword,
    categories = [],
    jobs = [],
    recentSearches = [],
    onClose,
    onRemoveRecent,
    onClearRecent,
    onKeywordSelect,
}) {
    const normalizedKeyword = normalizeSearchText(keyword);
    const hasKeyword = normalizedKeyword.length > 0;

    const { suggested, related } = useMemo(() => {
        const names = categories.map((c) => c.name);
        const titles = jobs.map((j) => j.title);
        const pool = Array.from(new Set([...names, ...titles]));

        const matches = pool.filter((name) =>
            normalizeSearchText(name).includes(normalizedKeyword),
        );
        const startsWithMatches = matches.filter((name) =>
            normalizeSearchText(name).startsWith(normalizedKeyword),
        );
        const startsWithSet = new Set(startsWithMatches);
        const containsMatches = matches.filter((name) => !startsWithSet.has(name));

        return {
            suggested: startsWithMatches.slice(0, SUGGESTED_LIMIT),
            related: containsMatches.slice(0, RELATED_LIMIT),
        };
    }, [categories, jobs, normalizedKeyword]);

    const jobMatches = useMemo(
        () => filterJobsByKeyword(jobs, categories, keyword).slice(0, JOB_LIMIT),
        [jobs, categories, keyword],
    );

    const popularKeywords = useMemo(
        () => getPopularKeywords(categories, jobs, POPULAR_LIMIT),
        [categories, jobs],
    );

    const interestingJobs = useMemo(() => getTopJobs(jobs, INTERESTING_JOB_LIMIT), [jobs]);

    const jobsToShow = hasKeyword ? jobMatches : interestingJobs;

    return (
        <div className={styles.panel}>
            <div className={styles.column}>
                {hasKeyword ? (
                    <>
                        <SuggestionGroup
                            title="Từ khoá gợi ý"
                            items={suggested}
                            emptyText="Không tìm thấy từ khoá phù hợp"
                            onSelect={onKeywordSelect}
                        />
                        <SuggestionGroup
                            title="Từ khoá liên quan"
                            items={related}
                            emptyText="Không tìm thấy từ khoá liên quan"
                            onSelect={onKeywordSelect}
                        />
                    </>
                ) : recentSearches.length > 0 ? (
                    <RecentKeywordGroup
                        title="Từ khóa tìm kiếm gần đây"
                        items={recentSearches}
                        icon={RestoreOutlined}
                        jobs={jobs}
                        categories={categories}
                        onSelect={onKeywordSelect}
                        onRemove={onRemoveRecent}
                        onClearAll={onClearRecent}
                    />
                ) : (
                    <RecentKeywordGroup
                        title="Từ khóa phổ biến"
                        items={popularKeywords.map((entry) => entry.keyword)}
                        icon={TrendingUpOutlined}
                        jobs={jobs}
                        categories={categories}
                        onSelect={onKeywordSelect}
                    />
                )}
            </div>

            <div className={styles.divider} />

            <div className={styles.column}>
                <span className={styles.groupTitle}>Việc làm có thể bạn quan tâm</span>
                {jobsToShow.length > 0 ? (
                    <ul className={styles.jobList}>
                        {jobsToShow.map((job) => (
                            <li key={job.id}>
                                <Link to={`/viec-lam/${job.slug}`} className={styles.jobRow}>
                                    <Avatar className={styles.jobLogo} variant="rounded">
                                        {job.company?.company_name?.charAt(0)}
                                    </Avatar>
                                    <div className={styles.jobInfo}>
                                        <span className={styles.jobTitle}>{job.title}</span>
                                        <span className={styles.jobCompany}>
                                            {job.company?.company_name}
                                        </span>
                                        <span className={styles.jobSalary}>
                                            {formatSalary(job.salary)}
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className={styles.emptyGroup}>
                        {hasKeyword
                            ? `Không có việc làm phù hợp với "${keyword}"`
                            : "Chưa có việc làm phù hợp"}
                    </p>
                )}
            </div>

            <button
                type="button"
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Đóng gợi ý"
            >
                <CloseOutlined className={styles.closeIcon} />
            </button>
        </div>
    );
}

function SuggestionGroup({ title, items, emptyText, onSelect }) {
    return (
        <div className={styles.group}>
            <span className={styles.groupTitle}>{title}</span>
            {items.length > 0 ? (
                <ul className={styles.keywordList}>
                    {items.map((name) => (
                        <li key={name}>
                            <Link
                                to={`/viec-lam?keyword=${encodeURIComponent(name)}`}
                                className={styles.keywordRow}
                                onClick={() => onSelect?.(name)}
                            >
                                <SearchOutlined className={styles.keywordIcon} />
                                {name}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.emptyGroup}>{emptyText}</p>
            )}
        </div>
    );
}

function RecentKeywordGroup({ title, items, icon: Icon, jobs, categories, onSelect, onRemove, onClearAll }) {
    return (
        <div className={styles.group}>
            <div className={styles.groupHeader}>
                <span className={styles.groupTitle}>{title}</span>
                {onClearAll && items.length > 0 && (
                    <button type="button" className={styles.clearAllButton} onClick={onClearAll}>
                        Xóa tất cả
                    </button>
                )}
            </div>
            {items.length > 0 ? (
                <ul className={styles.keywordList}>
                    {items.map((name) => {
                        const count = filterJobsByKeyword(jobs, categories, name).length;
                        return (
                            <li key={name} className={styles.recentItem}>
                                <Link
                                    to={`/viec-lam?keyword=${encodeURIComponent(name)}`}
                                    className={styles.recentKeywordRow}
                                    onClick={() => onSelect?.(name)}
                                >
                                    <Icon className={styles.keywordIcon} />
                                    <span className={styles.recentKeywordInfo}>
                                        <span className={styles.recentKeywordName}>{name}</span>
                                        <span className={styles.recentKeywordCount}>
                                            {count} việc làm
                                        </span>
                                    </span>
                                </Link>
                                {onRemove && (
                                    <button
                                        type="button"
                                        className={styles.removeKeywordButton}
                                        aria-label={`Xoá từ khoá ${name}`}
                                        onClick={() => onRemove(name)}
                                    >
                                        <CloseOutlined className={styles.removeIcon} />
                                    </button>
                                )}
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p className={styles.emptyGroup}>Không có từ khoá</p>
            )}
        </div>
    );
}

export default SearchOverlay;
