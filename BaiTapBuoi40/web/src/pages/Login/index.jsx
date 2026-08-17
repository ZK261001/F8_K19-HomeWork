import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowForward from "@mui/icons-material/ArrowForward";

import { useAuth } from "../../context/AuthContext";
import styles from "./Login.module.css";

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setFormError("");

        if (!email.trim() || !password) {
            setFormError("Vui lòng nhập email và mật khẩu");
            return;
        }

        setIsSubmitting(true);
        try {
            await login(email.trim(), password);
            const redirectTo = location.state?.from?.pathname ?? "/";
            navigate(redirectTo, { replace: true });
        } catch (error) {
            setFormError(error.message || "Đăng nhập thất bại, vui lòng thử lại");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.logo}>
                    top<span className={styles.logoAccent}>cv</span>
                </div>
                <h1 className={styles.title}>Chào mừng quay trở lại</h1>

                <form onSubmit={handleSubmit} noValidate>
                    {formError && <p className={styles.formError}>{formError}</p>}

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            className={styles.input}
                            type="email"
                            placeholder="Nhập email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="password">
                            Password
                        </label>
                        <div className={styles.passwordWrapper}>
                            <input
                                id="password"
                                className={styles.input}
                                type={showPassword ? "text" : "password"}
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <button
                                type="button"
                                className={styles.togglePassword}
                                onClick={() => setShowPassword((prev) => !prev)}
                                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                            >
                                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                            </button>
                        </div>
                    </div>

                    <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
                        <ArrowForward fontSize="small" />
                    </button>
                </form>

                <p className={styles.footerText}>
                    Bạn chưa có tài khoản?{" "}
                    <Link to="/dang-ky" className={styles.footerLink}>
                        Đăng ký ngay
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
