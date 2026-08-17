import { useAuth } from "../../context/AuthContext";
import styles from "./PostJob.module.css";

function PostJob() {
    const { user } = useAuth();

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Đăng tuyển việc làm</h1>
            <p className={styles.greeting}>Xin chào, {user?.fullName}!</p>
            <p className={styles.message}>Chức năng đăng tuyển đang được phát triển.</p>
        </div>
    );
}

export default PostJob;
