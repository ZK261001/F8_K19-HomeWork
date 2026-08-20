import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "../../context/AuthContext";
import PillTabs from "../../components/PillTabs";
import styles from "./Register.module.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

const TABS = [
    { key: "candidate", label: "Ứng viên" },
    { key: "recruiter", label: "Nhà tuyển dụng" },
];

function validateCandidate(form) {
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

function validateEmployer(form) {
    const errors = {};

    if (!form.mst.trim()) {
        errors.mst = "Vui lòng nhập mã số thuế";
    }

    if (!form.name.trim()) {
        errors.name = "Vui lòng nhập tên công ty";
    }

    if (!form.director.trim()) {
        errors.director = "Vui lòng nhập tên người đại diện";
    }

    if (!form.phone.trim()) {
        errors.phone = "Vui lòng nhập số điện thoại";
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

    const [activeTab, setActiveTab] = useState("candidate");

    const [candidateForm, setCandidateForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [employerForm, setEmployerForm] = useState({
        mst: "",
        name: "",
        internationalName: "",
        director: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleTabChange(key) {
        setActiveTab(key);
        setErrors({});
        setFormError("");
    }

    function handleCandidateChange(field) {
        return (event) => {
            setCandidateForm((prev) => ({ ...prev, [field]: event.target.value }));
        };
    }

    function handleEmployerChange(field) {
        return (event) => {
            setEmployerForm((prev) => ({ ...prev, [field]: event.target.value }));
        };
    }

    async function handleCandidateSubmit(event) {
        event.preventDefault();
        setFormError("");

        const validationErrors = validateCandidate(candidateForm);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setIsSubmitting(true);
        try {
            await register({
                role: "candidate",
                fullName: candidateForm.fullName.trim(),
                email: candidateForm.email.trim(),
                phone: candidateForm.phone.trim(),
                password: candidateForm.password,
            });
            navigate("/");
        } catch (error) {
            setFormError(error.message || "Đăng ký thất bại, vui lòng thử lại");
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleEmployerSubmit(event) {
        event.preventDefault();
        setFormError("");

        const validationErrors = validateEmployer(employerForm);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setIsSubmitting(true);
        try {
            const mst = employerForm.mst.trim();
            const name = employerForm.name.trim();
            const internationalName = employerForm.internationalName.trim();
            const director = employerForm.director.trim();
            const phone = employerForm.phone.trim();
            const email = employerForm.email.trim();

            await register({
                role: "recruiter",
                fullName: director,
                email,
                phone,
                password: employerForm.password,
                company: { mst, name, internationalName, director, phone, email },
            });
            navigate("/");
        } catch (error) {
            setFormError(error.message || "Đăng ký thất bại, vui lòng thử lại");
        } finally {
            setIsSubmitting(false);
        }
    }

    const isCandidate = activeTab === "candidate";

    return (
        <div className={styles.page}>
            <div className={styles.wrapper}>
                <div className={styles.logo}>
                    Top<span className={styles.logoAccent}>CV</span>
                </div>
                <h1 className={styles.title}>
                    {isCandidate ? "Đăng ký tài khoản ứng viên" : "Đăng ký tài khoản nhà tuyển dụng"}
                </h1>
                <p className={styles.subtitle}>
                    {isCandidate
                        ? "Tạo tài khoản để ứng tuyển và theo dõi hồ sơ"
                        : "Tạo tài khoản để đăng tuyển và tìm kiếm ứng viên"}
                </p>

                <div className={styles.tabsWrapper}>
                    <PillTabs tabs={TABS} activeKey={activeTab} onChange={handleTabChange} />
                </div>

                <div className={styles.card}>
                    {isCandidate ? (
                        <form onSubmit={handleCandidateSubmit} noValidate>
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
                                    value={candidateForm.fullName}
                                    onChange={handleCandidateChange("fullName")}
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
                                    value={candidateForm.email}
                                    onChange={handleCandidateChange("email")}
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
                                    value={candidateForm.phone}
                                    onChange={handleCandidateChange("phone")}
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
                                    value={candidateForm.password}
                                    onChange={handleCandidateChange("password")}
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
                                    value={candidateForm.confirmPassword}
                                    onChange={handleCandidateChange("confirmPassword")}
                                />
                                {errors.confirmPassword && (
                                    <p className={styles.errorText}>{errors.confirmPassword}</p>
                                )}
                            </div>

                            <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleEmployerSubmit} noValidate>
                            {formError && <p className={styles.formError}>{formError}</p>}

                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="mst">
                                    Mã số thuế <span className={styles.required}>*</span>
                                </label>
                                <input
                                    id="mst"
                                    className={styles.input}
                                    type="text"
                                    placeholder="0102345678"
                                    value={employerForm.mst}
                                    onChange={handleEmployerChange("mst")}
                                />
                                {errors.mst && <p className={styles.errorText}>{errors.mst}</p>}
                            </div>

                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="name">
                                    Tên công ty <span className={styles.required}>*</span>
                                </label>
                                <input
                                    id="name"
                                    className={styles.input}
                                    type="text"
                                    placeholder="Công ty Cổ phần Công nghệ ABC"
                                    value={employerForm.name}
                                    onChange={handleEmployerChange("name")}
                                />
                                {errors.name && <p className={styles.errorText}>{errors.name}</p>}
                            </div>

                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="internationalName">
                                    Tên quốc tế
                                </label>
                                <input
                                    id="internationalName"
                                    className={styles.input}
                                    type="text"
                                    placeholder="ABC Technology Joint Stock Company"
                                    value={employerForm.internationalName}
                                    onChange={handleEmployerChange("internationalName")}
                                />
                                <p className={styles.hint}>Không bắt buộc</p>
                            </div>

                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="director">
                                    Người đại diện <span className={styles.required}>*</span>
                                </label>
                                <input
                                    id="director"
                                    className={styles.input}
                                    type="text"
                                    placeholder="Nguyễn Văn An"
                                    value={employerForm.director}
                                    onChange={handleEmployerChange("director")}
                                />
                                {errors.director && <p className={styles.errorText}>{errors.director}</p>}
                            </div>

                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="employerPhone">
                                    Số điện thoại <span className={styles.required}>*</span>
                                </label>
                                <input
                                    id="employerPhone"
                                    className={styles.input}
                                    type="tel"
                                    placeholder="0243 7654 321"
                                    value={employerForm.phone}
                                    onChange={handleEmployerChange("phone")}
                                />
                                {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}
                            </div>

                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="employerEmail">
                                    Email <span className={styles.required}>*</span>
                                </label>
                                <input
                                    id="employerEmail"
                                    className={styles.input}
                                    type="email"
                                    placeholder="hr@congty.vn"
                                    value={employerForm.email}
                                    onChange={handleEmployerChange("email")}
                                />
                                {errors.email && <p className={styles.errorText}>{errors.email}</p>}
                            </div>

                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="employerPassword">
                                    Mật khẩu <span className={styles.required}>*</span>
                                </label>
                                <input
                                    id="employerPassword"
                                    className={styles.input}
                                    type="password"
                                    value={employerForm.password}
                                    onChange={handleEmployerChange("password")}
                                />
                                {errors.password ? (
                                    <p className={styles.errorText}>{errors.password}</p>
                                ) : (
                                    <p className={styles.hint}>Tối thiểu 8 ký tự, có cả chữ và số</p>
                                )}
                            </div>

                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="employerConfirmPassword">
                                    Nhập lại mật khẩu <span className={styles.required}>*</span>
                                </label>
                                <input
                                    id="employerConfirmPassword"
                                    className={styles.input}
                                    type="password"
                                    value={employerForm.confirmPassword}
                                    onChange={handleEmployerChange("confirmPassword")}
                                />
                                {errors.confirmPassword && (
                                    <p className={styles.errorText}>{errors.confirmPassword}</p>
                                )}
                            </div>

                            <p className={styles.hint}>
                                Tài khoản nhà tuyển dụng sẽ được kích hoạt sau khi quản trị viên duyệt thông tin
                                công ty.
                            </p>

                            <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
                            </button>
                        </form>
                    )}
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
