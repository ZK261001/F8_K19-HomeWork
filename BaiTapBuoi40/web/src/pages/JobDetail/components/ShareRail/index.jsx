import { useState } from "react";
import Facebook from "@mui/icons-material/Facebook";
import Twitter from "@mui/icons-material/Twitter";
import LinkedIn from "@mui/icons-material/LinkedIn";
import LinkOutlined from "@mui/icons-material/LinkOutlined";

import styles from "./ShareRail.module.css";

function ShareRail({ url, title }) {
    const [copied, setCopied] = useState(false);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };

    return (
        <div className={styles.rail}>
            <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconButton}
                aria-label="Chia sẻ qua Facebook"
            >
                <Facebook className={styles.icon} />
            </a>
            <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconButton}
                aria-label="Chia sẻ qua Twitter"
            >
                <Twitter className={styles.icon} />
            </a>
            <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconButton}
                aria-label="Chia sẻ qua LinkedIn"
            >
                <LinkedIn className={styles.icon} />
            </a>
            <button
                type="button"
                className={styles.iconButton}
                onClick={handleCopyLink}
                aria-label="Sao chép liên kết"
            >
                <LinkOutlined className={styles.icon} />
            </button>
            {copied && <span className={styles.tooltip}>Đã sao chép</span>}
        </div>
    );
}

export default ShareRail;
