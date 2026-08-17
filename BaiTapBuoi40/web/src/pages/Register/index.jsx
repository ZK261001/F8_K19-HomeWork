import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "../../context/AuthContext";
import styles from "./Register.module.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

function validate(form) {
    const errors = {};

    if (!form.fullName.trim()) {
        errors.fullName = "Vui lòng nhập họ và tên";
    }

    if (!form.email.trim()) {
        errors.email = "Vui lòng nhập email";
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
        errors.email = "Email không hợp lệ";
    }

    if (!form.password) {
        errors.password = "Vui lòng nhập mật khẩu";
    } else if (!PASSWORD_REGEX.test(form.password)) {
        errors.password = "Mật khẩu tối thiểu 8 ký tự, có cả chữ và số";
    }

    if (!form.confirmPassword) {
        errors.confirmPassword = "Vui lòng nhập lại mật khẩu";
    } else if (form.confirmPassword !== form.password) {
        errors.confirmPassword = "Mật khẩu nhập lại không khớp";
    }

    return errors;
}

function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleChange(field) {
        return (event) => {
            setForm((prev) => ({ ...prev, [field]: event.target.value }));
        };
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setFormError("");

        const validationErrors = validate(form);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setIsSubmitting(true);
        try {
            await register({
                fullName: form.fullName.trim(),
                email: form.email.trim(),
                phone: form.phone.trim(),
                password: form.password,
            });
            navigate("/");
        } catch (error) {
            setFormError(error.message || "Đăng ký thất bại, vui lòng thử lại");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.wrapper}>
                <div className={styles.logo}>
                    Top<span className={styles.logoAccent}>CV</span>
                </div>
                <h1 className={styles.title}>Đăng ký tài khoản ứng viên</h1>
                <p className={styles.subtitle}>Tạo tài khoản để ứng tuyển và theo dõi hồ sơ</p>

                <div className={styles.card}>
                    <form onSubmit={handleSubmit} noValidate>
                        {formError && <p className={styles.formError}>{formError}</p>}

                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="fullName">
                                Họ và tên <span className={styles.required}>*</span>
                            </label>
                            <input
                                id="fullName"
                                className={styles.input}
                                type="text"
                                placeholder="Nguyễn Văn A"
                                value={form.fullName}
                                onChange={handleChange("fullName")}
                            />
                            {errors.fullName && <p className={styles.errorText}>{errors.fullName}</p>}
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="email">
                                Email <span className={styles.required}>*</span>
                            </label>
                            <input
                                id="email"
                                className={styles.input}
                                type="email"
                                placeholder="ban@email.com"
                                value={form.email}
                                onChange={handleChange("email")}
                            />
                            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="phone">
                                Số điện thoại
                            </label>
                            <input
                                id="phone"
                                className={styles.input}
                                type="tel"
                                placeholder="0901234567"
                                value={form.phone}
                                onChange={handleChange("phone")}
                            />
                            <p className={styles.hint}>Không bắt buộc</p>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="password">
                                Mật khẩu <span className={styles.required}>*</span>
                            </label>
                            <input
                                id="password"
                                className={styles.input}
                                type="password"
                                value={form.password}
                                onChange={handleChange("password")}
                            />
                            {errors.password ? (
                                <p className={styles.errorText}>{errors.password}</p>
                            ) : (
                                <p className={styles.hint}>Tối thiểu 8 ký tự, có cả chữ và số</p>
                            )}
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="confirmPassword">
                                Nhập lại mật khẩu <span className={styles.required}>*</span>
                            </label>
                            <input
                                id="confirmPassword"
                                className={styles.input}
                                type="password"
                                value={form.confirmPassword}
                                onChange={handleChange("confirmPassword")}
                            />
                            {errors.confirmPassword && (
                                <p className={styles.errorText}>{errors.confirmPassword}</p>
                            )}
                        </div>

                        <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
                        </button>
                    </form>
                </div>

                <p className={styles.footerText}>
                    Đã có tài khoản?{" "}
                    <Link to="/dang-nhap" className={styles.footerLink}>
                        Đăng nhập
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
