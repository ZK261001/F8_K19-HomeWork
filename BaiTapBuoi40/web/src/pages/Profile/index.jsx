import { Avatar } from "@mui/material";
import PersonOutlined from "@mui/icons-material/PersonOutlined";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import PhoneOutlined from "@mui/icons-material/PhoneOutlined";
import BadgeOutlined from "@mui/icons-material/BadgeOutlined";
import EventOutlined from "@mui/icons-material/EventOutlined";

import { useAuth } from "../../context/AuthContext";
import { formatDate } from "../../utils/date";
import styles from "./Profile.module.css";

const ROLE_LABELS = {
    candidate: "Ứng viên",
    recruiter: "Nhà tuyển dụng",
    admin: "Quản trị viên",
};

function Profile() {
    const { user } = useAuth();

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
        </div>
    );
}

export default Profile;
