import { Link } from "react-router";
import { Badge } from "@mui/material";
import FavoriteOutlined from "@mui/icons-material/FavoriteOutlined";

import { useSavedJobs } from "../../context/SavedJobsContext";
import styles from "./SavedJobsFab.module.css";

function SavedJobsFab() {
    const { savedCount } = useSavedJobs();

    // Tooltip viết bằng CSS chứ không dùng <Tooltip> của MUI: nhãn ở đây là chữ
    // tĩnh luôn nằm bên trái một nút position:fixed, không cần engine định vị.
    // MUI đặt mũi tên bằng Popper sau khi hộp chữ đã render nên khung hình đầu
    // tiên bị lệch rồi mới nhảy về chỗ; ở đây mũi tên là ::after của chính hộp
    // chữ nên không thể lệch.
    return (
        <Link to="/viec-lam-da-luu" className={styles.fab} aria-label="Danh sách việc làm đã lưu">
            <Badge badgeContent={savedCount} color="success" overlap="circular">
                <FavoriteOutlined className={styles.icon} />
            </Badge>

            <span className={styles.tooltip} aria-hidden="true">
                Danh sách việc làm đã lưu
            </span>
        </Link>
    );
}

export default SavedJobsFab;
